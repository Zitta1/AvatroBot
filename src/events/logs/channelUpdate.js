const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = async (client, oldChannel, newChannel) => {
  if (oldChannel.type == "dm" || newChannel.type == "dm") return;
  if (client.isEnabled("logs", oldChannel.guild) == false) return;
  if (client.eventEnabled("channelUpdate", oldChannel.guild) == false) return;
  const logChannel = await client.logChannel(oldChannel.guild);
  if (oldChannel.type == "text" && newChannel.type == "text") {
    if (oldChannel.name !== newChannel.name) {
      const embed = new MessageEmbed()
        .setColor("#ff6600")
        .setTimestamp()
        .setTitle(`Nom de channel mis à jour`)
        .addField(`Channel:`, newChannel, true)
        .addField(`Ancien nom:`, oldChannel.name, true)
        .addField(`Nouveau nom:`, newChannel.name, true);
      logChannel.send(embed);
    }
    if (oldChannel.topic !== newChannel.topic) {
      const embed = new MessageEmbed()
        .setColor("#ff6600")
        .setTimestamp()
        .setTitle(`Sujet de channel mis à jour`)
        .addField(`Channel:`, newChannel, true);
      if (oldChannel.topic.length > 0)
        embed.addField(`Ancien sujet:`, oldChannel.topic, true);
      else embed.addField(`Ancien sujet:`, `Aucun`, true);
      if (newChannel.topic.length > 0)
        embed.addField(`Nouveau sujet:`, newChannel.topic, true);
      else embed.addField(`Nouveau sujet`, `Aucun`, true);
      logChannel.send(embed);
    }
    if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
      const embed = new MessageEmbed()
        .setColor("#ff6600")
        .setTimestamp()
        .setTitle(`Mode lent de channel mis à jour`)
        .addField(`Channel:`, newChannel, true);
      if (oldChannel.rateLimitPerUser > 0)
        embed.addField(
          `Ancien mode lent:`,
          ms(ms(`${oldChannel.rateLimitPerUser}s`))
            .replace("0s", "Désactivé")
            .replace("s", " secondes")
            .replace("m", " minutes")
            .replace("h", " heures"),
          true
        );
      else embed.addField(`Ancien mode lent:`, `Désactivé`, true);
      if (newChannel.rateLimitPerUser > 0)
        embed.addField(
          `Nouveau mode lent`,
          ms(ms(`${newChannel.rateLimitPerUser}s`))
            .replace("s", " secondes")
            .replace("m", " minutes")
            .replace("h", " heures"),
          true
        );
      else embed.addField(`Nouveau mode lent:`, `Désactivé`, true);
      logChannel.send(embed);
    }
    if (oldChannel.nsfw !== newChannel.nsfw) {
      const embed = new MessageEmbed()
        .setColor("#ff6600")
        .setTimestamp()
        .setTitle(`Mode NSFW de channel mis à jour`)
        .addField(`Channel:`, newChannel, true);
      if (newChannel.nsfw == true) embed.addField(`Mode NSFW:`, `Activé`, true);
      else embed.addField(`Mode NSFW:`, `Désactivé`, true);
      logChannel.send(embed);
    }
  }
  if (oldChannel.type == "voice") {
    const embed = new MessageEmbed().setColor("#ff6600").setTimestamp();
    if (oldChannel.name !== newChannel.name) {
      const embed = new MessageEmbed()
        .setColor("#ff6600")
        .setTimestamp()
        .setTitle(`Nom du salon vocal ${newChannel.name} mis à jour`)
        .addField(`Ancien nom:`, oldChannel.name, true)
        .addField(`Nouveau nom:`, newChannel.name, true);
      logChannel.send(embed);
    }
    if (oldChannel.bitrate !== newChannel.bitrate) {
      const embed = new MessageEmbed()
        .setColor("#ff6600")
        .setTimestamp()
        .setTitle(`Débit binaire du salon vocal ${newChannel.name} mis à jour`)
        .addField(
          `Ancien débit:`,
          `${oldChannel.bitrate.toString().substr(0, 2)} Ko/s`,
          true
        )
        .addField(
          `Nouveau débit:`,
          `${newChannel.bitrate.toString().substr(0, 2)} Ko/s`,
          true
        );
      logChannel.send(embed);
    }
    if (oldChannel.userLimit !== newChannel.userLimit) {
      const embed = new MessageEmbed()
        .setColor("#ff6600")
        .setTimestamp()
        .setTitle(
          `Limite d'utilisateur du salon vocal ${newChannel.name} mise à jour`
        )
        .addField(`Ancienne limite:`, oldChannel.userLimit, true)
        .addField("Nouvelle limite:", newChannel.userLimit, true);
      logChannel.send(embed);
    }
  }
};
