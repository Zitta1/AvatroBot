const { MessageEmbed } = require("discord.js");

module.exports = async (client, oldGuild, newGuild) => {
  if (client.isEnabled("logs", newGuild) == false) return;
  if (client.eventEnabled("channelUpdate", newGuild) == false) return;
  const logChannel = await client.logChannel(newGuild);
  if (oldGuild.name !== newGuild.name) {
    const embed = new MessageEmbed()
      .setTitle(`Serveur mis à jour`)
      .setColor("#FF6600")
      .setTimestamp()
      .addFields(
        {
          name: `Ancien nom:`,
          value: oldGuild.name,
          inline: true,
        },
        {
          name: "Nouveau nom:",
          value: newGuild.name,
          inline: true,
        }
      );
    logChannel.send(embed);
  }
  if (oldGuild.region !== newGuild.region) {
    const embed = new MessageEmbed()
      .setTitle(`Serveur mis à jour`)
      .setColor("#FF6600")
      .setTimestamp()
      .addField(`Ancienne région:`, oldGuild.region.replace(), true)
      .addField(`Nouvelle région`, newGuild.region, true);
    logChannel.send(embed);
  }
};
