const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "discrim",
  aliases: ["dc"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!args[0])
      return message.reply(
        `merci d'indiquer un nombre positif à quatre chiffres`
      );
    const filter = args[0];
    if (isNaN(filter)) return message.reply(`merci d'indiquer un nombre`);
    if (filter.startsWith("-"))
      return message.reply(`merci d'indiquer un nombre positif`);
    if (filter.includes(".")) return message.reply(`merci d'indiquer un nombre entier`);
    if (filter.length !== 4)
      return message.reply(`merci d'indiquer un nombre à quatre chiffres`);
    if (filter == "0000")
      return message.reply(`merci d'indiquer un nombre supérieur à 0`);
    const members = client.users.cache
      .map((u) => u)
      .filter((u) => u.discriminator == filter);
    if (members.length == 0)
      return message.channel.send(`Aucun utilsateur de ce bot ne porte ce tag`);
    else if (members.length == 1) return message.channel.send(members[0].tag);
    else {
      const membersTags = [];
      for (let i in members) {
        membersTags.push(members[i].tag);
      }
      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`)
        .addField(`${members.length} utilisateurs ont ce tag`, membersTags);
      message.channel.send(embed);
    }
  },
  cooldown: 5,
  usage: "prefixname <tag>",
  description: "Renvoie une liste des utilisateurs du bot ayant le tag indiqué",
  category: "Infos",
};
