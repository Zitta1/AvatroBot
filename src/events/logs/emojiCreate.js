const { MessageEmbed } = require("discord.js");

module.exports = async (client, emoji) => {
  if (client.isEnabled("logs", emoji.guild) == false) return;
  if (client.eventEnabled("emojiCreate", emoji.guild) == false) return;
  const logChannel = await client.logChannel(emoji.guild);
  const embed = new MessageEmbed()
    .setTitle(`Emoji créé`)
    .setColor("#16ad2c")
    .setTimestamp()
    .addFields(
      {
        name: "Emoji:",
        value: emoji,
        inline: true,
      },
      {
        name: "ID:",
        value: emoji.id,
        inline: true,
      },
      {
        name: "Créateur:",
        value: await emoji.fetchAuthor(),
        inline: true,
      }
    );
  logChannel.send(embed);
};
