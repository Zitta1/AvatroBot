module.exports = async (client, channel) => {
  const settings = await client.getGuild(channel.guild);
  if (channel.type == "dm") return;
  if (client.isEnabled("logs", channel.guild) == false) return;
  if (client.eventEnabled("channelPinsUpdate", channel.guild) == false) return;
  const logChannel = await client.logChannel(channel.guild);
  if (!logChannel) return;
  const { MessageEmbed } = require("discord.js");
  const embed = new MessageEmbed()
    .setTimestamp()
    .setColor("#ff6600")
    .setTitle(`Messages épinglés modifiés dans`)
    .addFields(
      {
        name: "Nom",
        value: channel,
        inline: true,
      },
      {
        name: "ID",
        value: channel.id,
        inline: true,
      },
      {
        name: "Catégorie",
        value: channel.parent.name,
      }
    );
  logChannel.send(embed);
};
