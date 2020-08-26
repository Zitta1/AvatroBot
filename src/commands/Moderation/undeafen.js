module.exports = {
  name: "undeafen",
  aliases: ["undeaf"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("DEAFEN_MEMBERS") && !client.isMod())
      return client.noPerms();
    if (!client.hasPerm("DEAFEN_MEMBERS"))
      return client.hasNoPerm("mettre en sourdine des membres");
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!args[0])
      return message.reply(
        "merci d'indiquer un membre à ne plus mettre en sourdine"
      );
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    else if (!member.voice.channelID)
      return message.reply("ce membre n'est pas dans un salon vocal");
    else if (member.voice.serverDeaf == false)
      return message.reply("ce membre n'est pas déjà mis en sourdine");
    else {
      member.voice.setDeaf(false);
      message.channel.send(
        `${client.emotes.check} Le membre ${member} n'est plus mis en sourdine`
      );
    }
  },
  cooldown: 5,
  usage: "prefixname <member>",
  description: 'Enlève le statut "mis en sourdine" du membre indiqué',
  category: "Moderation",
  permission: "Modérateur",
};
