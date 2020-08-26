module.exports = {
  name: "ignoredroleremove",
  aliases: ["removeignoredrole", "irr", "rir"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`veuillez spécifier un rôle`);
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    if (!settings.modules.moderation.ignoredRoles.includes(role.id))
      return message.reply(`le rôle ${role} n'est pas ignoré`);
    else {
      await client.removeIgnoredRole(message.guild, role.id);
      message.channel.send(
        `${client.emotes.check} Le rôle ${role} ne sera plus ignoré`
      );
    }
  },
  cooldown: 5,
  usage: `prefixname <role>`,
  description:
    "Retire un rôle pour lequel les commandes ne seront plus ignorées",
  category: "Moderation",
  permission: "Administrateur",
};
