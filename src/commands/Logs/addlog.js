const mongoose = require("mongoose");
const logs = require("./logs");

module.exports = {
  name: "addlog",
  aliases: ["al"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("logs") == false) return client.moduleDisabled("logs");
    const logsList = [];
    for (let i in settings._doc.modules.logs.events) {
      if (i !== "description") logsList.push(i);
    }
    if (!args[0]) return message.reply(`merci d'indiquer un code de log`);
    if (!logsList.includes(args[0]))
      return message.reply(
        `\`${args[0]}\` n'est pas un code de log. Pour voir la liste codes de logs, tapez \`${settings.prefix}logs\``
      );
    if (settings.modules.logs.events[args[0]].enabled == true)
      return message.reply(`ce log est déjà activé`);
    if (args[0] == "channelCreate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelCreate.enabled": true,
      });
    if (args[0] == "channelDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelDelete.enabled": true,
      });
    if (args[0] == "messageDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDelete.enabled": true,
      });
    if (args[0] == "channelPinsUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelPinsUpdate.enabled": true,
      });
    if (args[0] == "channelUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelUpdate.enabled": true,
      });
    if (args[0] == "emojiCreate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiCreate.enabled": true,
      });
    if (args[0] == "emojiDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiDelete.enabled": true,
      });
    if (args[0] == "emojiUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiUpdate.enabled": true,
      });
    if (args[0] == "guildMemberUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildMemberUpdate.enabled": true,
      });
    if (args[0] == "guildUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildUpdate.enabled": true,
      });
    if (args[0] == "inviteCreate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteCreate.enabled": true,
      });
    if (args[0] == "inviteDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteDelete.enabled": true,
      });
    if (args[0] == "messageDeleteBulk")
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDeleteBulk.enabled": true,
      });
    if (args[0] == "messageUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageUpdate.enabled": true,
      });
    if (args[0] == "roleCreate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleCreate.enabled": true,
      });
    if (args[0] == "roleDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleDelete.enabled": true,
      });
    if (args[0] == "roleUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleUpdate.enabled": true,
      });
    if (args[0] == "userUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.userUpdate.enabled": true,
      });
    if (args[0] == "webhookUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.webhookUpdate.enabled": true,
      });
    message.channel.send(
      `${client.emotes.check} Le log \`${
        settings.modules.logs.events[args[0]].name
      }\` est désormait actif`
    );
  },
  cooldown: 5,
  usage: "<log_code>",
  description: "Active le log spécifié",
  category: "Logs",
  permission: "Administrateur",
};
