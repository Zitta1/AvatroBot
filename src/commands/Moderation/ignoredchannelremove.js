module.exports = {
  name: "ignoredchannelremove",
  aliases: ["removeignoredchannel", "icr", "ric"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply("veuillez indiquer un channel");
    const channel = client.getChannel(args[0]);
    if (!channel) return client.channelNotFound();
    if (!settings.modules.moderation.ignoredChannels.includes(channel.id))
      return message.reply(`le channel ${channel} n'est pas déjà ignoré`);
    else {
      await client.removeIgnoredChannel(message.guild, channel.id);
      return message.channel.send(
        `${client.emotes.check} Les commandes dans le channel ${channel} ne seront plus ignorées`
      );
    }
  },
  cooldown: 5,
  usage: "prefixname <channel>",
  description:
    "Retire un channel dans lequel les commandes ne seront plus ignorées",
  category: "Moderation",
  permission: "Administrateur",
};
