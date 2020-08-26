const { MessageEmbed, Message } = require("discord.js");

module.exports = async (client, oldMember, newMember) => {
  if (client.isEnabled("logs", newMember.guild) == false) return;
  if (client.eventEnabled("guildMemberUpdate", newMember.guild) == false)
    return;
  const logChannel = await client.logChannel(newMember.guild);
  if (oldMember.roles.cache !== newMember.roles.cache) {
    if (
      oldMember.roles.cache.map((r) => r).length <
      newMember.roles.cache.map((r) => r).length
    ) {
      const embed = new MessageEmbed()
        .setTitle(`Rôle ajouté à un membre`)
        .setColor("#16ad2c")
        .setTimestamp()
        .addField(`Membre:`, newMember, true);
      let role;
      newMember.roles.cache
        .map((r) => r)
        .forEach((r) => {
          if (!oldMember.roles.cache.map((r) => r).includes(r)) role = r;
        });
      embed.addField(`Rôle:`, role, true);
      logChannel.send(embed);
    } else {
      const embed = new MessageEmbed()
        .setTitle(`Rôle retiré à un membre`)
        .setColor("#FF0000")
        .setTimestamp()
        .addField(`Membre:`, newMember, true);
      let role;
      oldMember.roles.cache
        .map((r) => r)
        .forEach((r) => {
          if (!newMember.roles.cache.map((r) => r).includes(r)) role = r;
        });
      embed.addField(`Rôle:`, role, true);
      logChannel.send(embed);
    }
  }
  if (oldMember.nickname !== newMember.nickname) {
    const embed = new MessageEmbed()
      .setTitle(`Pseudo d'un membre mis à jour`)
      .setColor("#FF6600")
      .setTimestamp()
      .addField(`Membre:`, newMember, true);
    if (oldMember.nickname && newMember.nickname) {
      embed
        .addField(`Ancien pseudo:`, oldMember.nickname, true)
        .addField(`Nouveau pseudo:`, newMember.nickname, true);
      logChannel.send(embed);
    } else if (!oldMember.nickname && newMember.nickname) {
      embed
        .addField(`Ancien pseudo:`, `Aucun`, true)
        .addField(`Nouveau pseudo:`, newMember.nickname, true);
      logChannel.send(embed);
    } else {
      embed
        .addField(`Ancien pseudo:`, oldMember.nickname, true)
        .addField(`Nouveau pseudo:`, `Aucun`, true);
      logChannel.send(embed);
    }
  }
};
