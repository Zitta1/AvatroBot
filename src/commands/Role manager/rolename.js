module.exports = {
  name: "rolename",
  aliases: ["rn"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("MANAGE_ROLES")) return client.noPerms();
    if (!client.hasPerm("MANAGE_ROLES"))
      return client.hasNoPerm("gérer les rôles");
    if (!args[0]) return message.reply(`veuillez indiquer un rôle`);
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    const newName = args.slice(1).join(" ");
    if (newName.length > 100)
      return message.reply(
        `le nom du rôle doit contenir moin de 100 caractères`
      );
    await role.setName(newName);
    message.channel.send(
      `${client.emotes.check} Le nom du rôle à été changé en ${role}`
    );
  },
  cooldown: 5,
  usage: "prefixname <role> <new_name>",
  description: "Modifie l nom du rôle spécifié",
  category: "Role Manager",
  permission: "Gérer les rôles",
};
