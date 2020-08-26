module.exports = {
  name: "listmods",
  aliases: ["lm"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (
      !client.checkPerms("BAN_MEMBERS") &&
      !client.checkPerms("KICK_MEMBERS") &&
      !client.isMod()
    )
      return client.noPerms();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (settings.modules.moderation.moderatorRole == "none")
      return message.reply("Aucun rôle modérateur n'a été défini");
    const membersList = message.guild.roles.cache
      .map((r) => r)
      .filter((r) => r.id == settings.modules.moderation.moderatorRole)[0]
      .members.map((m) => m);
    const members = message.guild.members.cache
      .map((m) => m)
      .filter((m) => m.hasPermission("ADMINISTRATOR"))
      .filter((m) => m.id !== client.user.id);
    for (let i in members) {
      membersList.push(members[i]);
    }
    const membersListClean = [];
    for (let i in membersList) {
      if (membersListClean.includes(membersList[i]) == false)
        membersListClean.push(membersList[i]);
    }
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed()
      .setTitle("Liste des modérateurs")
      .setColor("#5991bd")
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`);
    for (let i in membersListClean) {
      embed.addField(
        membersListClean[i].displayName,
        `Nombre de modérations: ${
          settings.modules.moderation.cases.filter(
            (c) => c.moderatorID == membersListClean[i].id
          ).length
        }`,
        true
      );
    }
    message.channel.send(embed);
  },
  cooldown: 5,
  description:
    "Renvoie une liste des membres possédants le rôle modérateur ou ayant les permissions administrateur, et leur nombre de modérations effectuées",
  category: "Moderation",
  permission: "Modérateur",
};
