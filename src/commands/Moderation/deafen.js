const ms = require("ms");

module.exports = {
  name: "deafen",
  aliases: ["deaf"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("DEAFEN_MEMBERS") && !client.isMod())
      return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    if (!args[0])
      return message.reply("merci d'indiquer un membre à mettre en sourdine");
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    else if (!member.voice.channelID)
      return message.reply("ce membre n'est pas dans un salon vocal");
    else if (member.voice.serverDeaf == true)
      return message.reply("ce membre est déjà mis en sourdine");
    else {
      let deafTime;
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
          deafTime = args[1];
          if (args[2]) reason = args.slice(2).join(" ");
        } else reason = args.slice(1).join(" ");
      }
      if (!reason) reason = "Pas de raison spécifiée";
      member.voice.setDeaf(true, reason);
      if (deafTime) {
        setTimeout(() => {
          member.voice.setDeaf(false);
        }, ms(deafTime));
        member.send(
          `Vous serez mis en sourdine sur le serveur **${message.guild.name}** pendant ${deafTime}: ${reason}`
        );
        message.channel.send(
          `${client.emotes.check} Le membre ${member} est mis en sourdine pendant ${deafTime}`
        );
      } else {
        message.channel.send(
          `${client.emotes.check} Le membre ${member} est mis en sourdine: ${reason}`
        );
        member.send(
          `Vous serez mis en sourdine sur le serveur **${message.guild.name}**: ${reason}`
        );
      }
      let deafenAt = new Date()
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
      await client.updateModerations(member, message.guild, "deaf", {
        moderator: message.member.user.tag,
        moderatorID: message.member.id,
        date:
          deafenAt.split(" ").slice(0, 2).reverse().join(" ") +
          " " +
          deafenAt.substr(deafenAt.length - 4),
        reason: reason,
        length: deafTime,
      });
      await client.updateCases(message.guild, {
        type: "deaf",
        date:
          deafenAt.split(" ").slice(0, 2).reverse().join(" ") +
          " " +
          deafenAt.substr(deafenAt.length - 4),
        member: member.user.tag,
        memberID: member.id,
        moderator: message.member.user.tag,
        moderatorID: message.member.id,
        length: deafTime,
        reason: reason,
      });
    }
  },
  cooldown: 5,
  usage: "prefixname <member> [time] [reason]",
  description:
    "Met en sourdine un membre sur le serveur\nLe temps doit être exprimé sous cette forme:\n`1s = une seconde\n1m = une minute\n1h = une heure\n1d = un jour\n1w = une semaine\n1y = un an`\n le nombre exprimé devant la lettre est au choix, si aucun temps n'est exprimé, le membre sera mis en sourdine jusqu'à ce qu'un modérateur utilise la commande `undeafen`",
  category: "Moderation",
  permission: "Modérateur",
};
