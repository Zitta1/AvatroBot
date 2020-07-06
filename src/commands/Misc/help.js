const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
const categoryList = readdirSync("./src/commands/").filter(
  (cat) => cat !== "Bot Admin" && cat !== "Test"
);

module.exports = {
  name: "help",
  aliases: ["h"],
  run: (client, message, args, settings) => {
    if (client.isIgnored() == true) return;
    message.delete();
    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor("#301df8")
        .setTitle("Liste des commandes")
        .setDescription(
          `Pour plus d'informations sur une commande, tapez \`${settings.prefix}help <command_name>\`.`
        );
      for (const cat of categoryList) {
        embed.addField(
          cat,
          client.commands
            .filter((cmd) => cmd.category == cat)
            .map((cmd) => `\`${cmd.name}\``)
            .join(", ")
        );
      }

      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0]) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(args[0])
        );
      if (!command) return message.reply("cette commande n'existe pas!");

      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setTitle(`\`${command.name}\``)
        .addField(
          "Description",
          `${command.description} (cooldown: ${command.cooldown} secs)`
        )
        .addField(
          "Utilisation",
          command.usage
            ? `${settings.prefix}${command.name} ${command.usage}`
            : `${settings.prefix}${command.name}`
        )
        .addField("Permissions requises", command.permission);

      if (command.aliases.length > 0)
        embed.addField("Alias", `${command.aliases.join(", ")}`);
      return message.channel.send(embed);
    }
  },
  cooldown: 5,
  usage: "[command_name]",
  description: "Renvoie ce message",
  category: "Misc",
  permission: "Aucune",
};
