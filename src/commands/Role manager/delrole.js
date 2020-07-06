module.exports = {
  name: "delrole",
  aliases: ["dr", "deleterole"],
  run: async (client, message, args, settings) => {
    if (client.isIgnored() == true) return;
    message.delete();
    if (!client.checkPerms("MANAGE_ROLES")) return client.noPerms();
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    role.delete();
    message.channel.send("<a:check:728546006614147083> Le rôle à bien été supprimé");
  },
  cooldown: 5,
  usage: "<role_id || role_mention || role_name>",
  description: "Supprime un rôle",
  category: "Role Manager",
  permission: "Gérer les rôles",
};
