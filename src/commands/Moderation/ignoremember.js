module.exports = {
  name: "ignoremember",
  aliases: ["ignoreuser"],
  run: async (client, message, args) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`vous devez spécifier un membre`);
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    if (member.hasPermission("ADMINISTRATOR"))
      return message.reply(`commande interdite, ce membre est administrateur`);
    const dbMember = await client.getDbMember(member, message.guild);
    if (dbMember.isIgnored == false) {
      await client.updateMember(member, message.guild, "isIgnored", true);
      return message.channel.send(
        `${client.emotes.check} Le membre ${member} sera ignoré`
      );
    } else if (dbMember.isIgnored == true) {
      await client.updateMember(member, message.guild, "isIgnored", false);
      return message.channel.send(
        `${client.emotes.check} Le membre ${member} ne sera plus ignoré`
      );
    }
  },
  cooldown: 5,
  usage: `prefixname <member>`,
  description:
    "Ajoute / retire un membre pour lequel les commandes seront ignorées",
  category: "Moderation",
  permission: "Administrateur",
};
