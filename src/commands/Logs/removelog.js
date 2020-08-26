const mongoose = require("mongoose");

module.exports = {
  name: "removelog",
  aliases: ["rl"],
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
    if (settings.modules.logs.events[logsList[args[0] - 1]].enabled == false)
      return message.reply(`ce log est déjà désactivé`);
    if (args[0] !== "all") {if (args[0] == 1)
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelCreate.enabled": false,
      });
    if (args[0] == 2)
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelDelete.enabled": false,
      });
    if (args[0] == 12)
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDelete.enabled": false,
      });
    if (args[0] == 3)
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelPinsUpdate.enabled": false,
      });
    if (args[0] == 4)
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelUpdate.enabled": false,
      });
    if (args[0] == 5)
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiCreate.enabled": false,
      });
    if (args[0] == 6)
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiDelete.enabled": false,
      });
    if (args[0] == 7)
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiUpdate.enabled": false,
      });
    if (args[0] == 8)
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildMemberUpdate.enabled": false,
      });
    if (args[0] == 9)
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildUpdate.enabled": false,
      });
    if (args[0] == 10)
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteCreate.enabled": false,
      });
    if (args[0] == 11)
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteDelete.enabled": false,
      });
    if (args[0] == 13)
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDeleteBulk.enabled": false,
      });
    if (args[0] == 14)
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageUpdate.enabled": false,
      });
    if (args[0] == 15)
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleCreate.enabled": false,
      });
    if (args[0] == 16)
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleDelete.enabled": false,
      });
    if (args[0] == 17)
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleUpdate.enabled": false,
      });
    if (args[0] == 18)
      await client.updateGuild(message.guild, {
        "modules.logs.events.userUpdate.enabled": false,
      });
    if (args[0] == 19)
      await client.updateGuild(message.guild, {
        "modules.logs.events.webhookUpdate.enabled": false,
      });
    message.channel.send(
      `${client.emotes.check} Le log \`${
        settings.modules.logs.events[args[0]].name
      }\` est désormait inactif`
      );
    } else {
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelCreate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelDelete.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDelete.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelPinsUpdate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelUpdate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiCreate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiDelete.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiUpdate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildMemberUpdate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildUpdate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteCreate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteDelete.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDeleteBulk.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageUpdate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleCreate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleDelete.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleUpdate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.userUpdate.enabled": false,
      });
      await client.updateGuild(message.guild, {
        "modules.logs.events.webhookUpdate.enabled": false,
      });
      message.channel.send(`${client.emotes.check} Tous les logs sont désormais inactifs`);
    }
  },
  cooldown: 5,
  usage: `prefixname <log_code>`,
  description: "Désactive le log spécifié",
  category: "Logs",
  permission: "Administrateur",
};
