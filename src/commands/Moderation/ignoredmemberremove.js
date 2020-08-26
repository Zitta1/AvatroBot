module.exports = {
  name: "ignoredmemberremove",
  aliases: ["ignoreduserremove", "imr", "iur"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`vous devez spécifier un membre`);
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    const dbMember = await client.getDbMember(member, message.guild);
    if (dbMember.isIgnored == false)
      return message.reply(`le membre ${member} n'est pas déjà ignoré`);
    else await client.updateMember(member, message.guild, "isIgnored", false);
    return message.channel.send(
      `${client.emotes.check} Le membre ${member} ne sera plus ignoré`
    );
  },
  cooldown: 5,
  usage: `prefixname <member>`,
  description: "Retire un membre pour lequel les commandes seront ignorées",
  category: "Moderation",
  permission: "Administrateur",
};
