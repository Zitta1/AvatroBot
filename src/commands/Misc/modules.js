const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "modules",
  run: async (client, message, args, settings) => {
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setTitle("État des modules")
        .setDescription(
          `<:enabled:728220529303224320>: module activé\n<:disabled:728220530418647060>: module désactivé\nPour avoir plus d'information sur un module, tapez \`${settings.prefix}modules <module_name>\`\nPour activer/désactiver un module, tapez\n\`${settings.prefix}modules <module_name> <enable || disable>\``
        )
        .setColor("#5991bd")
        .setAuthor("", message.author.avatarURL())
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`);
      if (settings.modules.logs.enabled == true)
        embed.addField("Logs:", "<:enabled:728220529303224320>", true);
      if (settings.modules.logs.enabled == false)
        embed.addField("Logs:", "<:disabled:728220530418647060>", true);
      if (settings.modules.announcements.enabled == true)
        embed.addField("Annonces:", "<:enabled:728220529303224320>", true);
      if (settings.modules.announcements.enabled == false)
        embed.addField("Annonces:", "<:disabled:728220530418647060>", true);
      if (settings.modules.moderation.enabled == true)
        embed.addField("Modération:", "<:enabled:728220529303224320>", true);
      if (settings.modules.moderation.enabled == false)
        embed.addField("Modération:", "<:disabled:728220530418647060>", true);
      if (settings.modules.AFK.enabled == true)
        embed.addField("AFK:", "<:enabled:728220529303224320>", true);
      if (settings.modules.AFK.enabled == false)
        embed.addField("AFK:", "<:disabled:728220530418647060>", true);
      if (settings.modules.autoMessage.enabled == true)
        embed.addField(
          "Message Automatique:",
          "<:enabled:728220529303224320>",
          true
        );
      if (settings.modules.autoMessage.enabled == false)
        embed.addField(
          "Message Automatique:",
          "<:disabled:728220530418647060>",
          true
        );
      if (settings.modules.autoRoles.enabled == true)
        embed.addField(
          "Rôle automatique:",
          "<:enabled:728220529303224320>",
          true
        );
      if (settings.modules.autoRoles.enabled == false)
        embed.addField(
          "Rôle automatique:",
          "<:disabled:728220530418647060>",
          true
        );
      if (settings.modules.reminders.enabled == true)
        embed.addField("Rappels:", "<:enabled:728220529303224320>", true);
      if (settings.modules.reminders.enabled == false)
        embed.addField("Rappels:", "<:disabled:728220530418647060>", true);
      return message.channel.send(embed);
    }

    if (!args[1]) {
      const modulesObjects = settings.modules._doc.modules;
      const modulesName = [];
      for (const name in modulesObjects) {
        modulesName.push(name);
      }
      if (!modulesName.includes(args[0]))
        return message.reply(
          `${args[0]} n'est pas un nom de module, pour avoir la liste de tous les modules, tapez \`${settings.prefix}modules\``
        );
      const embed = new MessageEmbed()
        .setTitle(args[0])
        .setColor("#5991bd")
        .setAuthor("", message.author.avatarURL())
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`)
        .addField("Description", settings.modules[args[0]].description, true);
      if (settings.modules[args[0]].enabled == true)
        embed.setDescription(`<:enabled:728220529303224320> module activé`);
      if (settings.modules[args[0]].enabled == false)
        embed.setDescription(`<:disabled:728220530418647060> module désactivé`);
      message.channel.send(embed);
    };

    if (args[1]) {
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Vous n'avez pas les permissions pour effectuer cette commande");
      let newSetting
      if (args[1] == "enable") newSetting = true;
      if (args[1] == "disable") newSetting = false;
      await client.updateGuild(message.guild, {} );
    };
  },
  cooldown: 5,
  usage: "[<module_name> <enable || disable>]",
  description:
    "Affiche la liste des modules et leur état\nActive ou désactive un module",
  category: "Misc",
};
