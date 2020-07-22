const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "autodelete",
  aliases: ["ad"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setTitle("Suppression automatique des commandes")
        .setColor("#5991bd")
        .setAuthor("", message.author.avatarURL())
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`);
      if (settings.autoDelete == true) embed.addField("Statut:", "`activé`");
      else if (settings.autoDelete == false)
        embed.addField("Statut:", "`désactivé`");
      message.channel.send(embed);
    } else {
      if (args[0] !== "enable" && args[0] !== "disable")
        return message.reply("merci d'indiquer un statut valide");
      let newSetting;
      if (args[0] == "enable") {
        if (settings.autoDelete == true)
          return message.reply(
            "la suppression automatique des commandes est déjà activée"
          );
        newSetting = true;
      }
      if (args[0] == "disable") {
        if (settings.autoDelete == false)
          return message.reply(
            "la suppression automatique des commandes est déjà désactivée"
          );
        newSetting = false;
      }
      await client.updateGuild(message.guild, { autoDelete: newSetting });
      if (newSetting == true)
        message.channel.send(
          `${client.emotes.check} suppression automatique des commandes activé`
        );
      if (newSetting == false)
        message.channel.send(
          `${client.emotes.check} suppression automatique des commandes désactivé`
        );
    }
  },
  cooldown: 5,
  usage: "prefixname\nprefixname <enable || disable>",
  description:
    "Donne le statut de la suppression automatique des commandes\nActive / désactive la suppression automatique des commandes",
  category: "Admins",
  permission: "Administrateur",
};
