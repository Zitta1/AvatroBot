module.exports = {
  name: "logs",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("logs", message.guild) == false)
      return client.moduleDisabled("logs");
    const { MessageEmbed } = require("discord.js");
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setTitle("Liste des logs")
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`)
        .setColor("#5991bd");
      let y = 1;
      for (let i in settings._doc.modules.logs.events) {
        let iValue = settings.modules.logs.events[i.replace()];
        if (iValue.enabled == true)
          embed.addField(
            `${iValue.name} ${client.emotes.enabled}`,
            `code: ${i.replace(i, y)}`,
            true
          );
        if (iValue.enabled == false)
          embed.addField(
            `${iValue.name} ${client.emotes.disabled}`,
            `code: \`${i.replace(i, y)}\``,
            true
          );
        y++;
      }
      if (settings.modules.logs.logChannel != "none")
        embed.setDescription(
          `${client.emotes.enabled}: log activé\n${client.emotes.disabled}: log désactivé\nPour avoir plus d'information sur un log, tapez \`${settings.prefix}logs <log_code>\`\nSalon de logs: <#${settings.modules.logs.logChannel}>`
        );
      else
        embed.setDescription(
          `${client.emotes.enabled}: log activé\n${client.emotes.disabled}: log désactivé\nPour avoir plus d'information sur un log, tapez \`${settings.prefix}logs <log_code>\`\nAucun salon de logs. Pour en définir un, tapez \`${settings.prefix}logschannel <channel_id || channel_mention || channel_name>\``
        );
      message.channel.send(embed);
    } else {
      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`);
      const eventsList = [];
      for (let i in settings._doc.modules.logs.events) {
        eventsList.push(i);
      }
      if (isNaN(args[0]) || args[0] > eventsList.length)
        return message.reply(
          `\`${args[0]}\` n'est pas un code log. Pour voir la liste des codes de logs, tapez \`${settings.prefix}logs\``
        );
      else {
        event = settings.modules.logs.events[eventsList[args[0] - 1]];
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
  usage: `prefixname [log_code]`,
  description:
    "Renvoie la liste des diférents logs\nRenvoie les informations sur un log",
  category: "Logs",
  permission: "Administrateur",
};
