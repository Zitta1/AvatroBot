module.exports = {
  name: "ignoredroleremove",
  aliases: ["removeignoredrole", "irr", "rir"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`veuillez spécifier un rôle`);
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    if (settings.modules.moderation.ignoredRole !== role.id)
      return message.reply(`le rôle ${role} n'est pas ignoré`);
    else {
      await client.updateGuild(message.guild, {
        "modules.moderation.ignoredRole": "none",
      });
      message.channel.send(
        `${client.emotes.check} Le rôle ${role} ne sera plus ignoré`
      );
    }
  },
  cooldown: 5,
  usage: `prefixname <role_id || role_mention || role_name>`,
  description: "Retire un rôle pour lequel les commandes seront ignorées",
  category: "Moderation",
  permission: "Administrateur",
};
