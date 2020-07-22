module.exports = {
  name: "unban",
  aliases: ["ub"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("BAN_MEMBERS") && !client.isMod())
      return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    if (!args[0])
      return message.reply("merci d'indiquer l'identifiant d'un utilisateur");
    const user = await client.users.fetch(args[0]);
    if (!user) return client.memberNotFound();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Pas de raison spécifiée";
    await message.guild.members.unban(user, reason);
    message.channel.send(
      `${client.emotes.check} L'utilisateur ${user.tag} à été unban`
    );
  },
  cooldown: 5,
  usage: "prefixname <user_id>",
  description:
    "Révoque le bannissement d'un utilisateur spécifié par son identifiant",
  category: "Moderation",
  permission: "Modérateur",
};
