module.exports = {
  name: "rolecolor",
  aliases: ["rc"],
  run: async (client, message, args, settings) => {
    if (client.isIgnored() == true) return;
    message.delete();
    if (!client.checkPerms("MANAGE_ROLES")) return client.noPerms();
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    if (!args[1])
      return message.reply(
        "merci d'indiquer une nouvelle couleur en hexadécimal (#000000)"
      );
    if (!args[1].startsWith("#") || args[1].length !== 7)
      return message.reply("la couleur dois être en hexadécimal (#000000)");
    role.setColor(args[1]);
    message.channel.send(
      `<a:check:728546006614147083> La couleur du rôle ${role} a bien été changée`
    );
  },
  cooldown: 5,
  usage: "<role_id || role_mention || role_name> <hexacolor>",
  description: "Change la couleur du rôle indiqué",
  category: "Role Manager",
  permission: "Gérer les rôles",
};
