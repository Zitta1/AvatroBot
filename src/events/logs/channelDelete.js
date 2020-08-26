module.exports = async (client, channel) => {
  const settings = await client.getGuild(channel.guild);
  if (channel.type == "dm") return;
  if (client.isEnabled("logs", channel.guild) == false) return;
  if (client.eventEnabled("channelDelete", channel.guild) == false) return;
  const logChannel = await client.logChannel(channel.guild);
  if (!logChannel) return;
  const { MessageEmbed } = require("discord.js");
  const embed = new MessageEmbed().setTimestamp().setColor("#ff0000");
  switch (channel.type) {
    case "text":
      embed.setTitle(`Salon textuel supprimé`).addFields(
        {
          name: "Nom",
          value: channel,
          inline: true,
        },
        {
          name: "ID",
          value: channel.id,
          inline: true,
        },
        {
          name: "Catégorie",
          value: channel.parent.name,
          inline: true
        }
      );
      logChannel.send(embed);
      break;
    case "voice":
      embed.setTitle(`Salon vocal supprimé`).addFields(
        {
          name: "Nom",
          value: channel.name,
          inline: true,
        },
        {
          name: "ID",
          value: channel.id,
          inline: true,
        },
        {
          name: "Catégorie",
          value: channel.parent.name,
          inline: true
        }
      );
      if (channel.userLimit > 0)
        embed.addField("Limite d'utilisateur", channel.userLimit, true);
      else embed.addField("Limite d'utilisateurs", "aucune", true);
      logChannel.send(embed);
      break;
    case "category":
      embed.setTitle(`Catégorie supprimée`).addFields(
        {
          name: "Nom",
          value: channel.name,
          inline: true,
        },
        {
          name: "ID",
          value: channel.id,
          inline: true,
        }
      );
      logChannel.send(embed);
      break;
    case "news":
      embed.setTitle(`Salon news créé`).addFields(
        {
          name: "Nom",
          value: channel,
          inline: true,
        },
        {
          name: "ID",
          value: channel.id,
          inline: true,
        },
        {
          name: "Catégorie",
          value: channel.parent.name,
          inline: true,
        }
      );
      logChannel.send(embed);
      break;
    case "store":
      embed.setTitle(`Salon magasin créé`).addFields(
        {
          name: "Nom",
          value: channel.name,
          inline: true,
        },
        {
          name: "ID",
          value: channel.id,
          inline: true,
        },
        {
          name: "Catégorie",
          value: channel.parent.name,
          inline: true,
        }
      );
      logChannel.send(embed);
      break;
  }
};
