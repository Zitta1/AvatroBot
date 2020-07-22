module.exports = {
  name: "delrole",
  aliases: ["dr", "deleterole"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("MANAGE_ROLES")) return client.noPerms();
    if (!args[0]) return message.reply(`veuillez définir un rôle`);
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    role.delete();
    message.channel.send(`${client.emotes.check} Le rôle à bien été supprimé`);
  },
  cooldown: 5,
  usage: `prefixname <role>`,
  description: "Supprime un rôle",
  category: "Role Manager",
  permission: "Gérer les rôles",
};
