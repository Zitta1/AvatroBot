const { Collection } = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  const settings = await client.getGuild(message.guild);
  let memberSettings = await client.getDbMember(message.member);
  if (!memberSettings) {
    await client.createMember({
      memberID: message.member.id,
      memberDisplayName: message.member.displayName,
      memberTag: message.author.tag,
    });
    memberSettings = await client.getMember(message.member);
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
  if (message.content.indexOf(prefix) !== 0) return;

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!client.cooldowns.has(command.name) && command.name) {
    client.cooldowns.set(command.name, new Collection());
  }

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.name);
  const cdAmount = command.cooldown * 1000;

  if (
    tStamps.has(message.author.id) &&
    message.author.id !== "488912326179946497"
  ) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      let timeLeft = (cdExpirationTime - timeNow) / 1000;
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

  command.run(client, message, args, settings, memberSettings);
};
