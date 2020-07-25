module.exports = {
  name: "roleinfo",
  aliases: ["ri"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!args[0]) return message.reply(`veuillez spécifier un rôle`);
    let role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    let roleCreatedAt = role.createdAt
      .toString()
      .substr(4, 11)
      .replace("Jan", "01")
      .replace("Feb", "02")
      .replace("Mar", "03")
      .replace("Apr", "04")
      .replace("May", "05")
      .replace("Jun", "06")
      .replace("Jul", "07")
      .replace("Aug", "08")
      .replace("Sep", "09")
      .replace("Oct", "10")
      .replace("Nov", "11")
      .replace("Dec", "12");
    message.channel.send({
      embed: {
        color: role.hexColor,
        author: {
          icon_url: message.author.displayAvatarURL({ dynamic: true }),
        },
        fields: [
          {
            name: "ID",
            value: role.id,
            inline: true,
          },
          {
            name: "Nom",
            value: role.name,
            inline: true,
          },
          {
            name: "Couleur",
            value: role.hexColor,
            inline: true,
          },
          {
            name: "Mention",
            value: `\`${role}\``,
            inline: true,
          },
          {
            name: "Apparait séparément",
            value: role.hoist
              .toString()
              .replace(false, "Non")
              .replace(true, "Oui"),
            inline: true,
          },
          {
            name: "Position",
            value: role.position,
            inline: true,
          },
          {
            name: "Mentionable",
            value: role.mentionable
              .toString()
              .replace(false, "Non")
              .replace(true, "Oui"),
            inline: true,
          },
          {
            name: "Créé le",
            value:
              roleCreatedAt.split(" ").slice(0, 2).reverse().join(" ") +
              " " +
              roleCreatedAt.substr(roleCreatedAt.length - 4),
            inline: true,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: `ID: ${message.author.id}`,
        },
      },
    });
  },
  cooldown: 5,
  usage: `prefixname <role>`,
  description: "Renvoie les informations sur un rôle",
  category: "Infos",
  permissions: "Aucune",
};
