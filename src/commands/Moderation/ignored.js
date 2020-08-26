const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ignored",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    const ignoredRoles = settings.modules.moderation.ignoredRoles;
    const ignoredMembers = await client.getIgnoredMembers();
    const ignoredChannels = settings.modules.moderation.ignoredChannels;
    const ignoredRolesClean = [];
    const ignoredMembersClean = [];
    const ignoredChannelsClean = [];
    const embed = new MessageEmbed()
      .setTitle("Liste des channels, membres, et rôles ignorés")
      .setColor("#5991bd")
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`);
    for (let i in ignoredRoles) {
      ignoredRolesClean.push(`<@&${ignoredRoles[i]}>`);
    }
    for (let i in ignoredMembers) {
      ignoredMembersClean.push(`<@${ignoredMembers[i].memberID}>`);
    }
    for (let i in ignoredChannels) {
      ignoredChannelsClean.push(`<#${ignoredChannels[i]}>`);
    }
    if (ignoredRolesClean.length > 0)
      embed.addField(
        `Rôles ignorés: \`${ignoredRolesClean.length}\``,
        ignoredRolesClean.join(", "),
        true
      );
    else embed.addField(`Rôles ignorés:`, "Aucuns", true);
    if (ignoredMembersClean.length > 0)
      embed.addField(
        `Membres ignorés: \`${ignoredMembersClean.length}\``,
        ignoredMembersClean.join(", "),
        true
      );
    else embed.addField(`Membres ignorés:`, "Aucuns", true);
    if (ignoredChannelsClean.length > 0)
      embed.addField(
        `Channels ignorés: \`${ignoredChannelsClean.length}\``,
        ignoredChannelsClean.join(", "),
        true
      );
    else embed.addField(`Channels ignorés:`, "Aucuns", true);
    return message.channel.send(embed);
  },
  cooldown: 5,
  description: "Renvoie une liste des rôles, membres et channels ignorés",
  category: "Moderation",
  permission: "Administrateur",
};
