const ms = require("ms");

module.exports = {
  name: "clear",
  aliases: ["purge", "delete", "del", "cl"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("MANAGE_MESSAGES") && !client.isMod())
      return client.noPerms();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!client.hasPerm("MANAGE_MESSAGES"))
      return client.hasNoPerm("gérer les messages");
    if (
      isNaN(args[0]) ||
      args[0] < 1 ||
      args[0] > 100 ||
      args[0].startsWith("-") ||
      args[0].includes(".")
    )
      return message.reply(
        "vous devez spécifier un nombre entier positif entre 1 et 100"
      );

    const messages = await message.channel.messages.fetch({
      limit: args[0],
      before: message.id,
    });

    await message.delete();
    await message.channel.bulkDelete(messages);
    message.channel
      .send(
        `${client.emotes.check} ${
          messages.map((m) => m).length
        } messages supprimés!`
      )
      .then((m) =>
        setTimeout(() => {
          m.delete();
        }, ms("10s"))
      );
  },
  cooldown: 5,
  usage: "prefixname <number>",
  description: "Supprime le nombre de message indiqué, plus la commande",
  category: "Moderation",
  permission: "Gérer les messages || Modérateur",
};
