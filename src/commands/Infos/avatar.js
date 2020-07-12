const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["getpfp", "getpdp", "pfp", "pdp", "getavatar"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    const member = client.getMember(args[0]) || message.member;
    const embed = new MessageEmbed()
      .setTitle(`Photo de profil de ${member.displayName}`)
      .setImage(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`)
      .setAuthor("", message.author.displayAvatarURL({ dynamic: true }));
    return message.channel.send(embed);
  },
  cooldown: 5,
  usage: "[member_id || member_mention || member_name]",
  description:
    "Renvoie la photo de profile de l'utilisateur spécifié, ou sa propre photo de profile",
  category: "Infos",
  permission: "Aucunes",
};
