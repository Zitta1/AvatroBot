module.exports = {
  name: "prefix",
  aliases: ["p"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!args[0])
      return message.channel.send(
        `Préfixe actuel sur ce serveur: \`${settings.prefix}\``
      );
    if (args[0] == "reset") {
      await client.updateGuild(message.guild, { prefix: ">" });
      return message.channel.send(
        `${client.emotes.check} Préfixe réinitialisé: \`>\``
      );
    }
    if (args[0]) {
      const newSetting = args.join(" ");
      await client.updateGuild(message.guild, { prefix: newSetting });
      return message.channel.send(
        `${client.emotes.check} Préfixe mis à jour, ancien préfixe: \`${settings.prefix}\` nouveau préfixe: \`${newSetting}\``
      );
    }
  },
  cooldown: 5,
  usage: "[new_prefix]",
  description: "Renvoie le préfixe actuel, ou change le préfixe",
  category: "Admins",
  permission: "Administrateur",
};
