module.exports = {
  name: "addrole",
  aliases: ["ar", "roleadd", "ra"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms("MANAGE_ROLES")) return client.noPerms();
    if (!args[0])
      return message.reply("veuillez définir le nom du rôle");
    if (args[0].startsWith("\`\`\`")) return message.reply(`nom invalide`);
    if (args[0] == "everyone" || args[0] == "here") return message.reply(`nom invalide`);
    if (args[1]) {
      if (!args[1].startsWith("#") || args[1].length !== 7)
        return message.reply(
          "couleur invalide, merci d'indiquer une couleur sous format hexadécimal (#000000)"
        );
    }
    let color;
    if (args[1]) color = args[1];
    if (!args[1]) color = undefined;
    let hoist;
    if (args[2] == "true") hoist = true;
    if (args[2] == "false") hoist = false;
    if (!args[2]) hoist = undefined;
    await message.guild.roles.create({
      data: {
        name: args[0],
        color: color,
        hoist: hoist,
        mentionable: true,
      },
    });
    const newRole = client.getRole(args[0]);
    message.channel.send(
      `${client.emotes.check} Le rôle ${newRole} à été créé`
    );
    newRole.setMentionable(false);
  },
  cooldown: 5,
  usage: "<name> [hexcolor] [true || false] ",
  description:
    "Créé un nouveau role, avec une couleur en hexacolor (optionel) et si séparé des autres (optionel)",
  category: "Role Manager",
  permission: "Gérer les rôles",
};
