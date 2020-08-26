// à retravailler

module.exports = {
  name: "setnick",
  aliases: ["sn"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("MANAGE_NICKNAMES") && !client.isMod())
      return client.noPerms();
    if (!client.hasPerm("MANAGE_NICKNAMES"))
      return client.hasNoPerm("gérer les pseudos");
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`veuillez spécifier un membre`);
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    if (!args[1])
      return message.reply("vous devez spécifier un nom à attribuer");
    member.setNickname(args.slice(1).join(" "));
    message.channel.send(
      `${
        client.emotes.check
      } Le pseudo de ce membre est maintenant \`${args.slice(1).join(" ")}\``
    );
  },
  cooldown: 5,
  usage: `prefixname <new_nickname>`,
  description: "Modifie le pseudo d'un membre spécifié",
  category: "Moderation",
  permission: "Gérer les pseudos || Moderateur",
};
