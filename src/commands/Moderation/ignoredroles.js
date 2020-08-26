const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ignoredroles",
  aliases: ["ir"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    const ignoredRoles = settings.modules.moderation.ignoredRoles;
    if (ignoredRoles.length == 0)
      return message.channel.send(`Aucun rôle n'est ignoré`);
    else if (ignoredRoles.length == 1)
      return message.channel.send(
        `Le rôle <@&${ignoredRoles[0]}> est actuellement ignoré`
      );
    else {
      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`);
      const ignoredRolesClean = [];
      for (let i in ignoredRoles) {
        ignoredRolesClean.push(`<@&${ignoredRoles[i]}>`);
      }
      embed.addField("Rôles ignorés", ignoredRolesClean.join(", "));
      message.channel.send(embed);
    }
  },
  cooldown: 5,
  description: "Renvoie le(s) rôle(s) ignoré(s)",
  category: "Moderation",
  permission: "Administrateur",
};
