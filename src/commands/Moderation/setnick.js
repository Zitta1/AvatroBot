module.exports = {
  name: "setnick",
  aliases: ["sn"],
  run: async (client, message, args, settings) => {
    if (client.isIgnored() == true) return;
    message.delete();
    if (!client.isMod() || !client.checkPerms("MANAGE_NICKNAMES"))
      return client.noPerms();
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    if (!args[1])
      return message.reply("vous devez spécifier un nom à attribuer");
    member.setNickname(args[1]);
    message.channel.send(
      `<a:check:728546006614147083> Le pseudo de ce membre est maintenant \`${args[1]}\``
    );
  },
  cooldown: 5,
  usage: "<new_nickname>",
  description: "Modifie le pseudo d'un membre spécifié",
  category: "Moderation",
  permission: "Gérer les pseudos",
};
