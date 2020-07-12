module.exports = {
  name: "members",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms("MANAGE_ROLES") && !client.isMod())
      return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`veuillez définir un rôle`);
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed();
    const members = role.members.map((m) => m);
    const membersArray = [];
    for (let i in members) {
      membersArray.push(`<@${members[i].id}>`);
    }
    embed.addField(
      `Membres possédant le rôle ${role.name}`,
      membersArray.join("\n")
    );
    return message.channel.send(embed);
  },
  cooldown: 5,
  usage: "",
  description: "",
  category: "",
  permission: "",
};
