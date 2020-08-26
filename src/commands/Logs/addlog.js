const mongoose = require("mongoose");

module.exports = {
  name: "addlog",
  aliases: ["al"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("logs", message.guild) == false) return client.moduleDisabled("logs");
    const logsList = [];
    for (let i in settings._doc.modules.logs.events) {
      if (i !== "description") logsList.push(i);
    }
    if (!args[0]) return message.reply(`merci d'indiquer un code de log`);
    if (args[0] < 1 || args[0] > 19 || args[0] !== "all")
      return message.reply(
        `\`${args[0]}\` n'est pas un code de log. Pour voir la liste codes de logs, tapez \`${settings.prefix}logs\``
      );
    if (args[0] !== "all") {
      if (settings.modules.logs.events[logsList[args[0] - 1]].enabled == true)
        return message.reply(`ce log est déjà activé`);
      if (args[0] == 1)
        await client.updateGuild(message.guild, {
          "modules.logs.events.channelCreate.enabled": true,
        });
      if (args[0] == 2)
        await client.updateGuild(message.guild, {
          "modules.logs.events.channelDelete.enabled": true,
        });
      if (args[0] == 12)
        await client.updateGuild(message.guild, {
          "modules.logs.events.messageDelete.enabled": true,
        });
      if (args[0] == 3)
        await client.updateGuild(message.guild, {
          "modules.logs.events.channelPinsUpdate.enabled": true,
        });
      if (args[0] == 4)
        await client.updateGuild(message.guild, {
          "modules.logs.events.channelUpdate.enabled": true,
        });
      if (args[0] == 5)
        await client.updateGuild(message.guild, {
          "modules.logs.events.emojiCreate.enabled": true,
        });
      if (args[0] == 6)
        await client.updateGuild(message.guild, {
          "modules.logs.events.emojiDelete.enabled": true,
        });
      if (args[0] == 7)
        await client.updateGuild(message.guild, {
          "modules.logs.events.emojiUpdate.enabled": true,
        });
      if (args[0] == 8)
        await client.updateGuild(message.guild, {
          "modules.logs.events.guildMemberUpdate.enabled": true,
        });
      if (args[0] == 9)
        await client.updateGuild(message.guild, {
          "modules.logs.events.guildUpdate.enabled": true,
        });
      if (args[0] == 10)
        await client.updateGuild(message.guild, {
          "modules.logs.events.inviteCreate.enabled": true,
        });
      if (args[0] == 11)
        await client.updateGuild(message.guild, {
          "modules.logs.events.inviteDelete.enabled": true,
        });
      if (args[0] == 13)
        await client.updateGuild(message.guild, {
          "modules.logs.events.messageDeleteBulk.enabled": true,
        });
      if (args[0] == 14)
        await client.updateGuild(message.guild, {
          "modules.logs.events.messageUpdate.enabled": true,
        });
      if (args[0] == 15)
        await client.updateGuild(message.guild, {
          "modules.logs.events.roleCreate.enabled": true,
        });
      if (args[0] == 16)
        await client.updateGuild(message.guild, {
          "modules.logs.events.roleDelete.enabled": true,
        });
      if (args[0] == 17)
        await client.updateGuild(message.guild, {
          "modules.logs.events.roleUpdate.enabled": true,
        });
      if (args[0] == 18)
        await client.updateGuild(message.guild, {
          "modules.logs.events.userUpdate.enabled": true,
        });
      if (args[0] == 19)
        await client.updateGuild(message.guild, {
          "modules.logs.events.webhookUpdate.enabled": true,
        });
      message.channel.send(
        `${client.emotes.check} Le log \`${
          settings.modules.logs.events[args[0]].name
        }\` est désormait actif`
      );
    } else {
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelCreate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelDelete.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDelete.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelPinsUpdate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelUpdate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiCreate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiDelete.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiUpdate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildMemberUpdate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildUpdate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteCreate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteDelete.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDeleteBulk.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageUpdate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleCreate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleDelete.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleUpdate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.userUpdate.enabled": true,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.webhookUpdate.enabled": true,
      });
      message.channel.send(`${client.emotes.check} Tous les logs sont désormais actifs`);
    }
  },
  cooldown: 5,
  usage: `prefixname <log_code>`,
  description: "Active le log spécifié",
  category: "Logs",
  permission: "Administrateur",
};
