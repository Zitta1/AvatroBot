const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ignoredchannels",
  aliases: ["ic"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    const ignoredChannels = settings.modules.moderation.ignoredChannels;
    if (ignoredChannels.length == 0)
      return message.channel.send(`Aucun channel n'est ignoré`);
    else if (ignoredChannels.length == 1)
      return message.channel.send(
        `Les commandes dans le channel <#${ignoredChannels[0]}> sont ignorées`
      );
    else {
      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`);
      const ignoredChannelsClean = [];
      for (let i in ignoredChannels) {
        ignoredChannelsClean.push(`<#${ignoredChannels[i]}>`);
      }
      embed.addField("Channels ignorés", ignoredChannelsClean.join(", "));
      message.channel.send(embed);
    }
  },
  cooldown: 5,
  description: "Renvoie le(s) channel(s) ignoré(s)",
  category: "Moderation",
  permission: "Administrateur",
};
