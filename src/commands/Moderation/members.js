module.exports = {
  name: "members",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("MANAGE_ROLES") && !client.isMod())
      return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`veuillez définir un rôle`);
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed()
      .setColor(role.hexColor)
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`);
    const members = role.members.map((m) => m);
    const membersArray = [];
    for (let i in members) {
      membersArray.push(`<@${members[i].id}>`);
    }
    embed.addField(
      `Membres possédant le rôle ${role.name}`,
      membersArray.join(", ")
    );
    return message.channel.send(embed);
  },
  cooldown: 5,
  usage: `prefixname <role>`,
  description: "Renvoie la liste des membres posédant le rôle spécifié",
  category: "Moderation",
  permission: "Gérer les rôles || Modérateur",
};
