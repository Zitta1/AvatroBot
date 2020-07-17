module.exports = {
  name: "mute",
  aliases: [""],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms("MANAGE_ROLES") && !client.isMod())
      return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    const member = client.getMember(args[0]);
    if (
      member.hasPermission("ADMINISTRATOR") ||
      member.roles.cache
        .map((r) => r.id)
        .includes(settings.modules.moderation.moderatorRole)
    )
      return message.reply(
        `commande interdite, le membre ${member} est modérateur`
      );
    else {
      let mutedRole = message.guild.roles.cache.find((r) => r.name == "muted");
      if (!mutedRole) {
        await message.guild.roles.create({
          data: {
            name: "muted",
            color: "#000",
            permissions: [],
          },
        });

        mutedRole = message.guild.roles.cache.find((r) => r.name == "muted");
      }
      const channels = message.guild.channels.cache.map((ch) => ch);

      for (let i in channels) {
        await channels[i].updateOverwrite(mutedRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false,
        });
      }

      member.roles.add(mutedRole);
    }
  },
  cooldown: 5,
  usage: "prefixname <member_id || member_mention || member_name> [time]",
  description:
    "Empêche le membre mentioné d'envoyer des messages et de se connecter à un salon vocal",
  category: "Moderation",
  permission: "Modérateur",
};
