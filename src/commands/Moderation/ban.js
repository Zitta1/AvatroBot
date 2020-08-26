const ms = require("ms");

module.exports = {
  name: "ban",
  aliases: ["b"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("BAN_MEMBERS") && !client.isMod())
      return client.noPerms();
    if (!client.hasPerm("BAN_MEMBERS"))
      return client.hasNoPerm("bannir des membres");
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    let reason;
    switch (args[0]) {
      case "save":
        const member = client.getMember(args[1]);
        if (!member) return client.memberNotFound();
        let banTime;
        if (
          args[1].endsWith("s") ||
          args[1].endsWith("m") ||
          args[1].endsWith("h") ||
          args[1].endsWith("d") ||
          args[1].endsWith("w") ||
          args[1].endsWith("y")
        ) {
          banTime = args[1];
          if (args[2]) reason = args.slice(3).join(" ");
        } else if (args[1]) reason = args.slice(3).join(" ");
        if (!reason) reason = "Pas de raison spécifiée";
        if (banTime)
          member.send(
            `Vous serez banni du serveur **${message.guild.name}** pendant ${banTime}: *${reason}*`
          );
        else
          member.send(
            `Vous avez été banni du serveur **${message.guild.name}**: *${reason}*`
          );
        member.ban({ reason: reason });
        await client.updateModerations(member, message.guild, "ban", {
          moderator: message.member.user.tag,
          moderatorID: message.member.id,
          date: client.moderationDate(),
          length: banTime,
          reason: reason,
        });
        await client.updateCases(message.guild, {
          type: "ban save",
          date: client.moderationDate(),
          member: member.user.tag,
          memberID: member.id,
          moderator: message.member.user.tag,
          moderatorID: message.member.id,
          length: banTime,
          reason: reason,
        });
        if (banTime) {
          setTimeout(() => {
            message.guild.members.unban(member.user);
          }, ms(banTime));
          message.channel.send(
            `${client.emotes.check} ${member.user.tag} sera banni pendant ${banTime}: *${reason}*`
          );
        } else
          message.channel.send(
            `${client.emotes.check} ${member.user.tag} à été banni: *${reason}*`
          );
        return;
      case "match":
        const matched = args.slice(1).join(" ");
        if (!matched)
          return message.reply(
            `veuillez spécifier le message pour lequel les membres ayant envoyé ce message seront bannis`
          );
        const channels = message.guild.channels.cache
          .map((ch) => ch)
          .filter((ch) => ch.type == "text");
        const membersList = [];
        const messagesList = [];
        const membersListClean = [];
        for (let i in channels) {
          await channels[i].messages.fetch();
          channels[i].messages.cache
            .map((m) => m)
            .filter((m) => m.id !== message.id)
            .filter((m) => m.author !== client.user)
            .filter((m) => m.content.includes(matched))
            .forEach((Message) => {
              messagesList.push(Message);
            });
        }
        if (messagesList.length == 0)
          return message.channel.send("Aucuns messages correspondant trouvé");
        messagesList.forEach((Message) => {
          membersList.push(Message.member);
        });
        for (let i in membersList) {
          if (!membersListClean.includes(membersList[i]))
            membersListClean.push(membersList[i]);
        }
        for (let i in membersListClean) {
          if (
            membersListClean[i].hasPermission("ADMINISTRATOR") ||
            membersListClean[i].roles.cache
              .map((r) => r.id)
              .includes(settings.modules.moderation.moderatorRole)
          )
            message.reply(
              `Je ne peux pas ban ${membersListClean[i]}, cette personne est modérateur`
            );
          else {
            membersListClean[i].send(
              `Vous avez été banni du serveur ${message.guild.name}`
            );
            message.channel.send(
              `${client.emotes.check} Le membre ${membersListClean[i]} a été banni`
            );
            membersListClean[i].ban();
            await client.updateModerations(
              membersListClean[i].id,
              message.guild,
              "ban",
              {
                moderator: message.member.user.tag,
                moderatorID: message.member.id,
                date: client.moderationDate(),
                length: null,
                reason: "ban match",
              }
            );
            await client.updateCases(message.guild, {
              type: "ban match",
              date: client.moderationDate(),
              member: membersListClean[i].id,
              moderator: message.member.id,
              matchText: matched,
            });
          }
        }
        return;
    }
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    let banTime;
    if (args[1]) {
      if (
        args[1].endsWith("s") ||
        args[1].endsWith("m") ||
        args[1].endsWith("h") ||
        args[1].endsWith("d") ||
        args[1].endsWith("w") ||
        args[1].endsWith("y")
      ) {
        banTime = args[1];
        if (args[3]) reason = args.slice(3).join(" ");
      } else if (args[1]) reason = args.slice(3).join(" ");
    }
    if (!reason) reason = "Pas de raison spécifiée";
    if (banTime)
      member.send(
        `Vous serez banni du serveur **${message.guild.name}** pendant ${banTime}: *${reason}*`
      );
    else
      member.send(
        `Vous avez été banni du serveur **${message.guild.name}**: *${reason}*`
      );
    member.ban({ days: 7, reason: reason });
    await client.updateModerations(member, message.guild, "ban", {
      moderator: message.member.user.tag,
      moderatorID: message.member.id,
      date: client.moderationDate(),
      reason: reason,
    });
    await client.updateCases(message.guild, {
      type: "ban",
      date: client.moderationDate(),
      member: member.user.tag,
      memberID: member.id,
      moderator: message.member.user.tag,
      moderatorID: message.member.id,
      length: banTime,
      reason: reason,
    });
    if (banTime) {
      setTimeout(() => {
        message.guild.members.unban(member.user);
      }, ms(banTime));
      message.channel.send(
        `${client.emotes.check} ${member.user.tag} sera banni pendant ${banTime}: *${reason}*`
      );
    } else
      message.channel.send(
        `${client.emotes.check} ${member.user.tag} à été banni: *${reason}*`
      );
  },
  cooldown: 0,
  usage: `prefixname <member> [time] [reason]\nprefixname save <member> [time] [reason]\nprefixname match <match_text>`,
  description:
    "Banni un membre, avec comme option de sauvegarder les messages de ce membre ou alors de bannir tous les membres ayant envoyé un message contenant un terme",
  category: "Moderation",
  permission: "Modérateur || Bannir des membres",
};
