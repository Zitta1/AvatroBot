const { MessageEmbed } = require("discord.js");

module.exports = async (client, oldEmoji, newEmoji) => {
  if (client.isEnabled("logs", oldEmoji.guild) == false) return;
  if (client.eventEnabled("emojiUpdate", oldEmoji.guild) == false) return;
  const logChannel = await client.logChannel(oldEmoji.guild);
  const embed = new MessageEmbed()
    .setTitle(`Emoji mis à jour`)
    .setColor("#FF6600")
    .setTimestamp()
    .addFields({
      name: `Emoji:`,
      value: newEmoji,
      inline: true,
    }, {
      name: `Ancien nom`,
      value: oldEmoji.name,
      inline: true,
    }, {
      name: `Nouveau nom`,
      value: newEmoji.name,
      inline: true,
    });
  logChannel.send(embed);
};
