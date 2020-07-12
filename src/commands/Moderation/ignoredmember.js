module.exports = {
  name: "ignoredmember",
  aliases: ["ignoreduser"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    const members = await client.getAllMembers({
      isIgnored: true,
      guildID: message.guild,
    });
    if (!members) return message.channel.send(`Aucuns membres ignoré`);
    let membersList = [];
    for (let i in members) {
      membersList.push(`<@${members[i].memberID}>`);
    }
    message.channel.send(membersList.join("\n"));
  },
  cooldown: 5,
  description: "Renvoie la liste des personnes ignorées sur ce serveur",
  category: "Moderation",
  permission: "Administrateur",
};
