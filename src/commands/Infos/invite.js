const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    const embed = new MessageEmbed()
      .setColor("#5991bd")
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`)
      .addField(
        `Lien d'invitation pour ajouter ${client.user.username} à votre serveur`,
        `cliquez [ici](https://discordapp.com/oauth2/authorize?client_id=727140686532444230&scope=bot&permissions=8)`
      );
    message.channel.send(embed);
  },
  cooldown: 5,
  usage: "prefixname",
  description: "",
  category: "",
  permission: "",
};
