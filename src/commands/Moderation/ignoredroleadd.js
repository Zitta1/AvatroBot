module.exports = {
  name: "ignoredroleadd",
  aliases: ["addignoredrole", "ira", "air"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`veuillez spécifier un rôle`);
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    if (settings.modules.moderation.ignoredRoles.includes(role.id))
      return message.reply(`le rôle ${role} est déjà ignoré`);
    else {
      await client.addIgnoredRole(message.guild, role.id);
      return message.channel.send(
        `${client.emotes.check} Le rôle ${role} sera ignoré`
      );
    }
  },
  cooldown: 5,
  usage: `prefixname <role>`,
  description: "Ajoute un rôle pour lequel les commandes seront ignorées",
  category: "Moderation",
  permission: "Administrateur",
};
