const { MessageEmbed } = require("discord.js");

module.exports = async (client, emoji) => {
  if (client.isEnabled("logs", emoji.guild) == false) return;
  if (client.eventEnabled("emojiDelete", emoji.guild) == false) return;
  const logChannel = await client.logChannel(emoji.guild);
  const embed = new MessageEmbed()
    .setTitle(`Emoji supprimé`)
    .setColor("#ff0000")
    .setTimestamp()
    .addFields(
      {
        name: "Emoji URL:",
        value: `[ici](${emoji.url})`,
        inline: true,
      },
      {
        name: "ID:",
        value: emoji.id,
        inline: true,
      }
    );
  logChannel.send(embed);
};
