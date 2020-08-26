const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "botinfo",
  aliases: ["bi"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    const botStats = await client.getBotStats();
    const guilds = client.guilds.cache.map((g) => g);
    const uptime = client.uptime;
    const users = client.users.cache.map((u) => u).length;
    const embed = new MessageEmbed()
      .setColor("#5991bd")
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`)
      .addField("Serveurs:", guilds.length)
      .addField("Utilisateurs:", users)
      .addField("Commandes exécutées", botStats[0].commandsRun)
      .addField("Uptime:", ms(uptime))
      .addField(
        `Ajouter ${client.user.username} à votre serveur`,
        "[ici](https://discordapp.com/oauth2/authorize?client_id=727140686532444230&scope=bot&permissions=8)"
      )
      .addField("Serveur Discord:", `https://discord.gg/9zNtkbK`);
    message.channel.send(embed);
  },
  cooldown: 5,
  description: "Renvoie des informations sur le bot",
  category: "Infos",
};
