module.exports = async (client, channel) => {
  if (channel.type == "dm") return;
  if (client.isEnabled("logs") == false) return;
  if (client.eventEnabled("channelCreate") == false) return;
  const logChannel = client.logChannel();
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
