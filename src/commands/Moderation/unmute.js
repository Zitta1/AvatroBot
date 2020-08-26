module.exports = {
  name: "unmute",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("MANAGE_ROLES") && !client.isMod())
      return client.noPerms();
    if (!client.hasPerm("MANAGE_ROLES"))
      return client.hasNoPerm("gérer les rôles");
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply("merci d'indiquer un membre à unmute");
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    const mutedRole = message.guild.roles.cache.find((r) => r.name == "muted");
    if (!mutedRole) return message.reply("personne n'a encore été mute");
    else if (!member.roles.cache.map((r) => r).includes(mutedRole))
      return message.reply(`ce membre n'est pas mute`);
    else {
      member.roles.remove(mutedRole);
      message.channel.send(
        `${client.emotes.check} Le membre ${member} est mute`
      );
    }
  },
  cooldown: 5,
  usage: "prefixname <member>",
  description:
    "Rétablie la permission d'écrire et de se connecter à un salon vocal à un membre déjà mute",
  category: "Moderation",
  permission: "Modérateur",
};
