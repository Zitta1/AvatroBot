const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emotes",
  aliases: ["emojis"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    const emotes = message.guild.emojis.cache
      .map((e) => e)
      .filter((e) => e.animated == false);
    const animated = message.guild.emojis.cache
      .map((e) => e)
      .filter((e) => e.animated == true);
    const emotesCount = message.guild.emojis.cache
      .map((e) => e)
      .filter((e) => e.animated == false).length;
    const animatedCount = message.guild.emojis.cache
      .map((e) => e)
      .filter((e) => e.animated == true).length;
    const embed = new MessageEmbed()
      .setColor("#5991bd")
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`)
      .addFields(
        {
          name: `${emotesCount}/50 emojis`,
          value: emotes.join(" "),
        },
        {
          name: `${animatedCount}/50 Animés`,
          value: animated.join(" "),
        }
      );
    message.channel.send(embed);
  },
  cooldown: 5,
  description: "Renvoie la liste des émojis du serveur",
  category: "Infos",
};
