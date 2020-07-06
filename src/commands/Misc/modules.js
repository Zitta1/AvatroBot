const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "modules",
  run: async (client, message, args, settings) => {
    if (client.isIgnored() == true) return;
    message.delete();
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
        embed.addField("Announcements:", "<:enabled:728220529303224320>", true);
      if (settings.modules.announcements.enabled == false)
        embed.addField(
          "Announcements:",
          "<:disabled:728220530418647060>",
          true
        );
      if (settings.modules.moderation.enabled == true)
        embed.addField("Moderation:", "<:enabled:728220529303224320>", true);
      if (settings.modules.moderation.enabled == false)
        embed.addField("Moderation:", "<:disabled:728220530418647060>", true);
      if (settings.modules.AFK.enabled == true)
        embed.addField("AFK:", "<:enabled:728220529303224320>", true);
      if (settings.modules.AFK.enabled == false)
        embed.addField("AFK:", "<:disabled:728220530418647060>", true);
      if (settings.modules.autoMessage.enabled == true)
        embed.addField("AutoMessage:", "<:enabled:728220529303224320>", true);
      if (settings.modules.autoMessage.enabled == false)
        embed.addField("AutoMessage:", "<:disabled:728220530418647060>", true);
      if (settings.modules.autoRoles.enabled == true)
        embed.addField("AutoRoles:", "<:enabled:728220529303224320>", true);
      if (settings.modules.autoRoles.enabled == false)
        embed.addField("AutoRoles:", "<:disabled:728220530418647060>", true);
      if (settings.modules.reminders.enabled == true)
        embed.addField("Reminders:", "<:enabled:728220529303224320>", true);
      if (settings.modules.reminders.enabled == false)
        embed.addField("Reminders:", "<:disabled:728220530418647060>", true);
      return message.channel.send(embed);
    }

    if (!args[1]) {
      const modulesObjects = settings.modules._doc.modules;
      const modulesName = [];
      for (const name in modulesObjects) {
        modulesName.push(name.toLowerCase());
      }
      if (!modulesName.includes(args[0].toLowerCase())) {
        return message.reply(
          `${args[0]} n'est pas un nom de module, pour avoir la liste de tous les modules, tapez \`${settings.prefix}modules\``
        );
      }
      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setAuthor("", message.author.avatarURL())
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`)
        .addField("Description", settings.modules[args[0]].description, true);
      if (settings.modules[args[0]].enabled == true)
        embed.setDescription(`<:enabled:728220529303224320> module activé`);
      if (settings.modules[args[0]].enabled == false)
        embed.setDescription(`<:disabled:728220530418647060> module désactivé`);
      if (args[0].toLowerCase() == "logs") embed.setTitle("Logs");
      if (args[0].toLowerCase() == "announcements")
        embed.setTitle("Announcements");
      if (args[0].toLowerCase() == "moderation") embed.setTitle("Moderation");
      if (args[0].toLowerCase() == "afk") embed.setTitle("AFK");
      if (args[0].toLowerCase() == "automessage") embed.setTitle("AutoMessage");
      if (args[0].toLowerCase() == "autoroles") embed.setTitle("AutoRoles");
      if (args[0].toLowerCase() == "reminders") embed.setTitle("Reminders");
      message.channel.send(embed);
    }

    if (args[1]) {
      if (!client.checkPerms("ADMINISTRATOR"))
        return client.noPerms();
      const modulesObjects = settings.modules._doc.modules;
      const modulesNames = [];
      for (const name in modulesObjects) {
        modulesNames.push(name.toLowerCase());
      }
      if (!modulesNames.includes(args[0].toLowerCase()))
        return message.reply(
          `${args[0]} n'est pas un nom de module, pour avoir la liste de tous les modules, tapez \`${settings.prefix}modules\``
        );
      let newSetting;
      if (args[1] == "enable") newSetting = true;
      if (args[1] == "disable") newSetting = false;
      if (args[0].toLowerCase() == "logs") {
        await client.updateGuild(message.guild, {
          "modules.logs.enabled": newSetting,
        });
        if (newSetting == true)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`Logs\` à bien été activé. Pour plus d'informations sur les options de logs, tapez \`${settings.prefix}logs\`.`
          );
        if (newSetting == false)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`Logs\` à bien été désactivé.`
          );
      }
      if (args[0].toLowerCase() == "announcements") {
        await client.updateGuild(message.guild, {
          "modules.announcements.enabled": newSetting,
        });
        if (newSetting == true)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`Announcements\` à bien été activé. Pour plus d'informations tapez \`${settings.prefix}announcements\``
          );
        if (newSetting == false)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`Announcements\` à bien été désactivé.`
          );
      }
      if (args[0].toLowerCase() == "moderation") {
        await client.updateGuild(message.guild, {
          "modules.moderation.enabled": newSetting,
        });
        if (newSetting == true)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`Moderation\` à bien été activé.`
          );
        if (newSetting == false)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`Moderation\` à bien été désactivé.`
          );
      }
      if (args[0].toLowerCase() == "afk") {
        await client.updateGuild(message.guild, {
          "modules.AFK.enabled": newSetting,
        });
        if (newSetting == true)
          return message.channel.send(`<a:check:728546006614147083> Le module \`AFK\` à bien été activé.`);
        if (newSetting == false)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`AFK\` à bien été désactivé.`
          );
      }
      if (args[0].toLowerCase() == "automessage") {
        await client.updateGuild(message.guild, {
          "modules.autoMessage.enabled": newSetting,
        });
        if (newSetting == true)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`AutoMessage\` à bien été activé. Pour plus d'informations tapez \`${settings.prefix}automessage\`.`
          );
        if (newSetting == false)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`AutoMessage\` à bien été désactivé.`
          );
      }
      if (args[0].toLowerCase() == "autoroles") {
        await client.updateGuild(message.guild, {
          "modules.autoRoles.enabled": newSetting,
        });
        if (newSetting == true)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`AutoRoles\` à bien été activé. Pour plus d'informations tapez \`${settings.prefix}autoroles\`.`
          );
        if (newSetting == false)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`AutoRoles\` à bien été désactivé.`
          );
      }
      if (args[0].toLowerCase() == "reminders") {
        await client.updateGuild(message.guild, {
          "modules.reminders.enabled": newSetting,
        });
        if (newSetting == true)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`Reminders\` à bien été activé.`
          );
        if (newSetting == false)
          return message.channel.send(
            `<a:check:728546006614147083> Le module \`Reminders\` à bien été désactivé.`
          );
      }
    }
  },
  cooldown: 5,
  usage: "[module_name] [enable || disable]",
  description:
    "Affiche la liste des modules et leur état\nActive ou désactive un module",
  category: "Misc",
  permission:
    "Aucunes si liste des modules et infos / Administrateur si activation / désactivation",
};
