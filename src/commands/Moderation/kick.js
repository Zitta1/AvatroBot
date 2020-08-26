module.exports = {
  name: "kick",
  aliases: ["k", "👢"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("KICK_MEMBERS") && !client.isMod())
      return client.noPerms();
    if (!client.hasPerm("KICK_MEMBERS"))
      return client.hasNoPerm("expulser des membres");
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`veuillez indiquer un membre`);
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    let reason;
    if (args[1]) reason = args.slice(1).join(" ");
    else reason = "pas de raison spécifiée";
    await member.send(
      `Vous avez été expulsé du serveur **${message.guild.name}**: *${reason}*`
    );
    member.kick(reason);
    message.channel.send(
      `${client.emotes.check} ${member.user.tag} à été expulsé: *${reason}*`
    );
    await client.updateModerations(member, message.guild, "kick", {
      moderator: message.member.user.tag,
      moderatorID: message.member.id,
      date: client.moderationDate(),
      reason: reason,
    });
    await client.updateCases(message.guild, {
      type: "kick",
      date: client.moderationDate(),
      member: member.user.tag,
      memberID: member.id,
      moderator: message.member.user.tag,
      moderatorID: message.member.id,
      reason: reason,
    });
  },
  cooldown: 5,
  usage: "prefixname <member>",
  description: "Explulse un membre du serveur",
  category: "Moderation",
  permission: "Modérateur || Expulser des membres",
};
