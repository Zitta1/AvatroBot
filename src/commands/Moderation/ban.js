const ms = require("ms");

module.exports = {
  name: "ban",
  aliases: ["b"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms() && !client.isMod()) return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    let reason;
    switch (args[0]) {
      case "save":
        const member = client.getMember(args[1]);
        if (!member) return client.memberNotFound();
        let banTime;
        if (
          args[2].endsWith("s") ||
          args[2].endsWith("m") ||
          args[2].endsWith("h") ||
          args[2].endsWith("d") ||
          args[2].endsWith("w") ||
          args[2].endsWith("y")
        ) {
          banTime = args[2];
          if (args[3]) reason = args.slice(3).join(" ");
        } else if (args[2]) reason = args.slice(3).join(" ");
        member.ban({ reason: reason });
        setTimeout(() => {
          message.guild.members.unban(member.user);
        }, ms(banTime));
        break;
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
          }
        }
        break;
    }
    const member = client.getMember(args[0]);
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
    member.ban({ reason: reason });
    setTimeout(() => {
      message.guild.members.unban(member.user);
    }, ms(banTime));
  },
  cooldown: 0,
  usage: `prefixname <member_id || member_mention || member_name> [time] [reason]\nprefixname save <member_id || member_mention || member_name> [time] [reason]\nprefixname match <match_text>`,
  description:
    "Ban un membre, avec comme option de sauvegarder les messages de ce membre ou alors de ban tous les membres ayant envoyé un message contenant un terme",
  category: "Moderation",
  permission: "Modérateur",
};
