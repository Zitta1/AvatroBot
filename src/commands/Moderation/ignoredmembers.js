const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ignoredmembers",
  aliases: ["im"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    const ignoredMembers = await client.getIgnoredMembers();
    if (ignoredMembers.length == 0)
      return message.channel.send("Aucuns membres ignorés");
    const embed = new MessageEmbed()
      .setTitle(`Membres ignorés: \`${ignoredMembers.length}\``)
      .setColor("#5991bd")
      .setAuthor("", message.author.avatarURL())
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`);
    for (let i in ignoredMembers) {
      embed.addField(`** **`, `<@${ignoredMembers[i].memberID}>`, true);
    }
    message.channel.send(embed);
  },
  cooldown: 5,
  usage: "prefixname",
  description: "",
  category: "",
  permission: "",
};
