const { Collection } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type == "dm") return;
  if (message.author.bot) return;
  const settings = await client.getGuild(message.guild);
  let memberSettings = await client.getDbMember(message.member, message.guild);
  if (!memberSettings) {
    await client.createMember({
      memberID: message.member.id,
      memberDisplayName: message.member.displayName,
      memberTag: message.author.tag,
      guildID: message.guild.id,
      guildName: message.guild.name,
    });
    memberSettings = await client.getDbMember(message.member, message.guild);
  }
  let prefix;
  if (!settings) prefix = ">";
  else prefix = settings.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  if (
    (message.content.length == 22 || message.content.length == 21) &&
    message.mentions.members.first() == message.guild.member(client.user)
  ) {
    return message.channel.send(
      `Mon préfixe sur ce serveur est: \`${settings.prefix}\``
    );
  }

  if (message.content == `<@!${client.user.id}> reset`) {
    await client.updateGuild(message.guild, { prefix: ">" });
    return message.channel.send(
      `${client.emotes.check} Préfixe réinitialisé: \`>\``
    );
  }
  if (message.content.indexOf(prefix) !== 0) return;
  if (
    message.guild.id !== "727142124096585739" &&
    message.author.id !== "488912326179946497" &&
    message.guild.id !== "728207022318944316"
  )
    return message.channel.send(
      "Je suis actuellement en développement, patientez encore un peu :wink:"
    );

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (command) {
    if (!client.cooldowns.has(command.name) && command.name) {
      client.cooldowns.set(command.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.name);
    const cdAmount = command.cooldown * 1000;

    if (
      tStamps.has(message.author.id) &&
      !client.checkPerms("ADMINISTRATOR") &&
      !client.isMod()
    ) {
      const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

      if (timeNow < cdExpirationTime) {
        let timeLeft = (cdExpirationTime - timeNow) / 1000;
        if (timeLeft.toFixed(0) == 0) timeLeft = 1;
        return message.reply(
          `merci d'attendre \`${timeLeft.toFixed(
            0
          )}\` seconde(s) avant d'utiliser à nouveau la commande \`${
            command.name
          }\`.`
        );
      }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);
  }

  client.getRole = (value) => {
    const roles = message.guild.roles.cache;
    const role =
      message.mentions.roles.first() ||
      roles.find((r) => r.id == value) ||
      roles.find((r) => r.name == value);
    return role;
  };

  client.getMember = (value) => {
    const member =
      message.mentions.members.first() ||
      message.guild.member(value) ||
      message.guild.members.cache.find((m) => m.user.username == value);
    return member;
  };

  client.isIgnored = async () => {
    if (message.member.hasPermission("ADMINISTRATOR")) return false;
    const ignoredRoles = settings.modules.moderation.ignoredRoles;
    const memberRoles = message.member.roles.cache.map((r) => r);
    for (let i in memberRoles) {
      if (ignoredRoles.includes(memberRoles[i].id)) return true;
    }
    const isIgnored = memberSettings.isIgnored;
    if (isIgnored == true) return true;
    const ignoredChannels = settings.modules.moderation.ignoredChannels;
    if (ignoredChannels.length > 0) {
      if (ignoredChannels.includes(message.channel.id)) return true;
    } else return false;
  };

  client.isOwner = () => {
    if (message.member == message.guild.owner) return true;
    else return false;
  };

  client.memberNotFound = () => {
    return message.reply(`membre introuvable`);
  };

  client.roleNotFound = () => {
    return message.reply(`rôle introuvable`);
  };

  client.checkPerms = (value) => {
    return message.member.hasPermission(value);
  };

  client.noPerms = () => {
    return message.reply(
      `vous n'avez pas les permission requises pour éxécuter cette commande`
    );
  };

  client.getChannel = (value) => {
    return (
      message.guild.channels.cache.find((ch) => ch.id == value) ||
      message.guild.channels.cache.find((ch) => ch.name == value) ||
      message.mentions.channels.first()
    );
  };

  client.channelNotFound = () => {
    return message.reply(`channel introuvable`);
  };

  client.moduleDisabled = (module) => {
    return message.reply(
      `Le module \`${module}\`est désactivé, pour l'activer tapez \`${settings.prefix}modules ${module} enable\``
    );
  };

  client.isMod = () => {
    return message.member.roles.cache
      .map((r) => r.id)
      .includes(settings.modules.moderation.moderatorRole);
  };

  client.hasPerm = (perm) => {
    return message.guild.me.hasPermission(perm);
  };

  client.hasNoPerm = (perm) => {
    return message.reply(
      `il me manque la permission \`${perm}\` pour exécuter cette commande`
    );
  };

  if (command) {
    command.run(client, message, args, settings, memberSettings);
    await client.addCommandRun();
  }
};
