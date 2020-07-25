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

  client.emotes = {
    enabled: "<:enabled:728220529303224320>",
    disabled: "<:disabled:728220530418647060>",
    loading2: "<a:loading2:728546005439479819>",
    loading: "<a:loading:728546005867561020>",
    check: "<a:check:728546006614147083>",
    xcheck: "<a:xcheck:728546007570317353>",
    vcheck: "<a:vcheck:728546008002330685>",
  };

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
          )}\` seconde(s) àavant d'utiliser à nouveau la commande \`${
            command.name
          }\`.`
        );
      }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);
  }

  client.getRole = (value) => {
    const roles = message.guild.roles.cache.map((r) => r);
    const role =
      message.mentions.roles.first() ||
      roles.filter((r) => r.id == value)[0] ||
      roles.filter((r) => r.name == value)[0];
    return role;
  };

  client.getMember = (value) => {
    const member =
      message.mentions.members.first() || message.guild.member(value);
    return member;
  };

  client.isIgnored = async () => {
    const ignoredRole = await settings.modules.moderation.ignoredRole;
    if (ignoredRole !== "none") {
      if (message.member.roles.cache.map((r) => r.id).includes(ignoredRole))
        return true;
    }
    const isIgnored = memberSettings.isIgnored;
    if (isIgnored == true) return true;
    else return false;
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
    const channel =
      message.guild.channels.cache
        .map((ch) => ch)
        .filter((ch) => ch.type == "text")
        .filter((ch) => ch.id == value)[0] ||
      message.guild.channels.cache
        .map((ch) => ch)
        .filter((ch) => ch.type == "text")
        .filter((ch) => ch.name == value)[0] ||
      message.mentions.channels.first();
    return channel;
  };

  client.channelNotFound = () => {
    return message.reply(`channel introuvable`);
  };

  client.isEnabled = (module) => {
    return settings.modules[module].enabled;
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

  client.eventEnabled = async (event) => {
    return settings.modules.logs.events[event];
  };

  client.logChannel = async () => {
    const channelID = settings.modules.logs.logChannel;
    return message.guild.channels.cache
      .map((ch) => ch)
      .filter((ch) => ch.type == "text")
      .filter((ch) => ch.id == channelID)[0];
  };

  if (command) command.run(client, message, args, settings, memberSettings);
};
