module.exports = {
  name: "logs",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("logs") == false) return client.moduleDisabled("logs");
    const { MessageEmbed } = require("discord.js");
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setTitle("Liste des logs")
        .setDescription(
          `${client.emotes.enabled}: log activé\n${client.emotes.disabled}: log désactivé\nPour avoir plus d'information sur un log, tapez \`${settings.prefix}logs <log_code>\`\nSalon de logs: <#${settings.modules.logs.logChannel}>`
        )
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`)
        .setAuthor("", message.author.displayAvatarURL({ dynamic: true }))
        .setColor("#5991bd");
      for (let i in settings._doc.modules.logs.events) {
        let iValue = settings.modules.logs.events[i.toString()];
        if (iValue.enabled == true)
          embed.addField(
            `${iValue.name} ${client.emotes.enabled}`,
            `code: ${i.toString()}`,
            true
          );
        if (iValue.enabled == false)
          embed.addField(
            `${iValue.name} ${client.emotes.disabled}`,
            `code: \`${i.toString()}\``,
            true
          );
      }
      message.channel.send(embed);
    } else {
      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`)
        .setAuthor("", message.author.displayAvatarURL({ dynamic: true }));
      const eventsList = [];
      for (let i in settings._doc.modules.logs.events) {
        eventsList.push(i);
      }
      console.log(settings.modules.logs.events);
      if (!eventsList.includes(args[0]))
        return message.reply(
          `\`${args[0]}\` n'est pas un code log. Pour voir la liste des codes de logs, tapez \`${settings.prefix}logs\``
        );
      else {
        event = settings.modules.logs.events[args[0]];
        if (event.enabled == true) {
          embed
            .setTitle(event.name)
            .setDescription(`${client.emotes.enabled} Log activé`);
        }
        if (event.enabled == false) {
          embed
            .setTitle(event.name)
            .setDescription(`${client.emotes.disabled} Log désactivé`);
        }
        embed
          .addField(`Fonction`, event.description)
          .addField(`Informations disponibles`, event.infoAvailable);
        message.channel.send(embed);
      }
    }
  },
  cooldown: 5,
  usage: "[log_code]",
  description:
    "Renvoie la liste des diférents logs\nRenvoie les informations sur un log",
  category: "Logs",
  permission: "Administrateur",
};
