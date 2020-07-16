module.exports = {
  name: "mute",
  aliases: [""],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (
      !client.checkPerms("MANAGE_ROLES") &&
      !client.checkPerms("BAN_MEMBERS") &&
      !client.checkPerms("KICK_MEMBERS") &&
      !client.isMod()
    )
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
      let mutedRole = message.guild.roles.cache.find(r => r.name == "muted");
      if (!mutedRole) {
        await message.guild.roles.create({
          data: {
            name: "muted",
            color: "#000",
            permissions: []
          }
        });

        message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.updateOverwrite(mutedRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false
          });
        });
      }
    }
  },
  cooldown: 5,
  usage: "prefixname",
  description: "",
  category: "",
  permission: "",
};
