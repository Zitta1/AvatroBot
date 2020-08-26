const ms = require("ms");

module.exports = {
  name: "mute",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("MANAGE_ROLES") && !client.isMod())
      return client.noPerms();
    if (!client.hasPerm("MANAGE_ROLES"))
      return client.hasNoPerm("gérer les rôles");
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");

    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
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
      let muteTime;
      let reason;
      if (args[1]) {
        if (
          args[1].endsWith("s") ||
          args[1].endsWith("m") ||
          args[1].endsWith("h") ||
          args[1].endsWith("d") ||
          args[1].endsWith("w") ||
          args[1].endsWith("y")
        ) {
          muteTime = args[1];
          if (args[3]) reason = args.slice(2).join(" ");
        } else if (args[2]) reason = args.slice(1).join(" ");
      }
      if (!reason) reason = "Pas de raison spécifiée";

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

      message.channel.send(
        `${client.emotes.check} Le membre ${member} est mute`
      );

      const mutedAt = new Date()
        .toString()
        .substr(4, 11)
        .replace("Jan", "01")
        .replace("Feb", "02")
        .replace("Mar", "03")
        .replace("Apr", "04")
        .replace("May", "05")
        .replace("Jun", "06")
        .replace("Jul", "07")
        .replace("Aug", "08")
        .replace("Sep", "09")
        .replace("Oct", "10")
        .replace("Nov", "11")
        .replace("Dec", "12");
      client.updateModerations(member, message.guild, "mute", {
        moderator: message.member.user.tag,
        moderatorID: message.member.id,
        date: client.moderationDate(),
        reason: reason,
        length: muteTime,
      });
      await client.updateCases(message.guild, {
        type: "mute",
        date: client.moderationDate(),
        member: member.user.tag,
        memberID: member.id,
        moderator: message.member.user.tag,
        moderatorID: message.member.id,
        reason: reason,
        length: muteTime,
      });

      if (muteTime) {
        setTimeout(() => {
          member.roles.remove(mutedRole);
        }, ms(muteTime));
        member.send(
          `Vous serez mute sur le serveur **${message.guild.name}** pendant ${muteTime}: ${reason}`
        );
      } else
        member.send(
          `Vous avez été mute sur le serveur **${message.guild.name}**: ${reason}`
        );
    }
  },
  cooldown: 5,
  usage: "prefixname <member> [time]",
  description:
    "Empêche le membre mentioné d'envoyer des messages et de se connecter à un salon vocal\nLe temps doit être exprimé sous cette forme:\n`1s = une seconde\n1m = une minute\n1h = une heure\n1d = un jour\n1w = une semaine\n1y = un an`\n le nombre exprimé devant la lettre est au choix, si aucun temps n'est exprimé, le membre sera dans l'incapacité d'envoyer des messages ou de se connecter jusqu'à ce qu'un modérateur utilise la commande `unmute`",
  category: "Moderation",
  permission: "Modérateur",
};
