module.exports = {
  name: "rolecolor",
  aliases: ["rc"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("MANAGE_ROLES")) return client.noPerms();
    if (!args[0]) return message.reply(`veuillez définir un rôle`);
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
      `${client.emotes.check} La couleur du rôle ${role} a bien été changée`
    );
  },
  cooldown: 5,
  usage: `prefixname <role> <hexacolor>`,
  description: "Change la couleur du rôle indiqué",
  category: "Role Manager",
  permission: "Gérer les rôles",
};
