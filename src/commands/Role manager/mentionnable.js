module.exports = {
  name: "mentionable",
  aliases: ["setmentionable"],
  run: async (client, message, args, settings) => {
    if (client.isIgnored() == true) return;
    message.delete();
    if (!client.checkPerms("MANAGE_ROLES")) return client.noPerms();
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    if (role.mentionable == true) {
      role.setMentionable(false);
      return message.channel.send(
        `<a:check:728546006614147083> Le rôle ${role} n'est plus mentionable`
      );
    }
    if (role.mentionable == false) {
      role.setMentionable(true);
      return message.channel.send(
        `<a:check:728546006614147083> Le rôle ${role} est maintenant mentionable`
      );
    }
  },
  cooldown: 5,
  usage: "<role_id || role_mention || role_name>",
  description: `Active / désactive le paramètre "Mentionable par tout le monde du rôle spécifié"`,
  category: "Role Manager",
  permission: "Gérer les rôles",
};
