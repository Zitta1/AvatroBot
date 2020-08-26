const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "membercount",
  aliases: ["mc"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    const memberCount = message.guild.memberCount;
    const humanCount = message.guild.members.cache
      .map((m) => m)
      .filter((m) => m.user.bot == false).length;
    const botCount = message.guild.members.cache
      .map((m) => m)
      .filter((m) => m.user.bot == true).length;
    const embed = new MessageEmbed()
      .setTitle(`Member count: \`${memberCount}\``)
      .setColor("#5991bd")
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`)
      .addFields(
        {
          name: "Human count",
          value: humanCount,
        },
        {
          name: "Bot count",
          value: botCount,
        }
      );
    message.channel.send(embed);
  },
  cooldown: 5,
  description: "Renvoie le nombre de membres du serveur",
  category: "Infos",
};
