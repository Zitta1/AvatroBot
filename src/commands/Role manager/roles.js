const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roles",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (!client.checkPerms("MANAGE_ROLES")) return client.noPerms();
    if (settings.autoDelete == true) message.delete();
    const roles = message.guild.roles.cache
      .map((r) => r)
      .filter((r) => r.name !== "@everyone");
    if (!roles) return message.channel.send(`No roles`);
    else {
      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`)
        .addField(`Rôles: ${roles.length}`, roles.join(", "));
      message.channel.send(embed);
    }
  },
  cooldown: 5,
  description: "Renvoie la liste de tous les roles du serveur",
  category: "Role Manager",
  permission: "Gérer les rôles",
};
