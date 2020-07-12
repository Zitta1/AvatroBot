const mongoose = require("mongoose");
const logs = require("./logs");

module.exports = {
  name: "removelog",
  aliases: ["rl"],
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
    if (settings.modules.logs.events[args[0]].enabled == false)
      return message.reply(`ce log est déjà désactivé`);
    if (args[0] == "channelCreate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelCreate.enabled": false,
      });
    if (args[0] == "channelDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelDelete.enabled": false,
      });
    if (args[0] == "messageDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDelete.enabled": false,
      });
    if (args[0] == "channelPinsUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelPinsUpdate.enabled": false,
      });
    if (args[0] == "channelUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.channelUpdate.enabled": false,
      });
    if (args[0] == "emojiCreate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiCreate.enabled": false,
      });
    if (args[0] == "emojiDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiDelete.enabled": false,
      });
    if (args[0] == "emojiUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.emojiUpdate.enabled": false,
      });
    if (args[0] == "guildMemberUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildMemberUpdate.enabled": false,
      });
    if (args[0] == "guildUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.guildUpdate.enabled": false,
      });
    if (args[0] == "inviteCreate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteCreate.enabled": false,
      });
    if (args[0] == "inviteDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.inviteDelete.enabled": false,
      });
    if (args[0] == "messageDeleteBulk")
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageDeleteBulk.enabled": false,
      });
    if (args[0] == "messageUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.messageUpdate.enabled": false,
      });
    if (args[0] == "roleCreate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleCreate.enabled": false,
      });
    if (args[0] == "roleDelete")
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleDelete.enabled": false,
      });
    if (args[0] == "roleUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.roleUpdate.enabled": false,
      });
    if (args[0] == "userUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.userUpdate.enabled": false,
      });
    if (args[0] == "webhookUpdate")
      await client.updateGuild(message.guild, {
        "modules.logs.events.webhookUpdate.enabled": false,
      });
    message.channel.send(
      `${client.emotes.check} Le log \`${
        settings.modules.logs.events[args[0]].name
      }\` est désormait inactif`
    );
  },
  cooldown: 5,
  usage: "<log_code>",
  description: "Désactive le log spécifié",
  category: "Logs",
  permission: "Administrateur",
};
