const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
const categoryList = readdirSync("./src/commands/").filter(
  (cat) => cat !== "Bot Admin" && cat !== "Test"
);

module.exports = {
  name: "help",
  aliases: ["h"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setTitle("Liste des commandes")
        .setDescription(
          `Pour plus d'informations sur une commande, tapez \`${settings.prefix}help <command_name>\`.`
        )
        .setAuthor("", message.author.displayAvatarURL({ dynamic: true }));
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
        .setDescription(
          "`<>`: paramètre requis\n`[]`: paramètre optionel\n`<option1 || option 2>`: séléctioner une de ces options"
        )
        .addField(
          "Description",
          `${command.description} (cooldown: ${command.cooldown} secs)`
        );
      if (command.usage)
        embed.addField(
          "Utilisation",
          `\`${command.usage
            .replace("prefix", settings.prefix)
            .replace("prefix", settings.prefix)
            .replace("prefix", settings.prefix)
            .replace("prefix", settings.prefix)
            .replace("prefix", settings.prefix)
            .replace("prefix", settings.prefix)
            .replace("prefix", settings.prefix)
            .replace("prefix", settings.prefix)
            .replace("name", command.name)
            .replace("name", command.name)
            .replace("name", command.name)
            .replace("name", command.name)
            .replace("name", command.name)
            .replace("name", command.name)
            .replace("name", command.name)
            .replace("name", command.name)
            .replace("<member>", "<member_id || member_mention || member_name>")
            .replace("<member>", "<member_id || member_mention || member_name>")
            .replace("<member>", "<member_id || member_mention || member_name>")
            .replace("<member>", "<member_id || member_mention || member_name>")
            .replace("<member>", "<member_id || member_mention || member_name>")
            .replace("<role>", "<role_id || role_mention || role_name>")
            .replace("<role>", "<role_id || role_mention || role_name>")
            .replace("<role>", "<role_id || role_mention || role_name>")
            .replace("<role>", "<role_id || role_mention || role_name>")
            .replace("<role>", "<role_id || role_mention || role_name>")
            .replace(
              "<channel>",
              "<channel_id || channel_mention || channel_name>"
            )
            .replace(
              "<channel>",
              "<channel_id || channel_mention || channel_name>"
            )
            .replace(
              "<channel>",
              "<channel_id || channel_mention || channel_name>"
            )
            .replace(
              "<channel>",
              "<channel_id || channel_mention || channel_name>"
            )
            .replace(
              "<channel>",
              "<channel_id || channel_mention || channel_name>"
            )}\``
        );
      else embed.addField("Utilisation", `${settings.prefix}${command.name}`);
      embed.addField("Permissions requises", command.permission);
      if (command.aliases)
        embed.addField("Alias", `${command.aliases.join(", ")}`);
      return message.channel.send(embed);
    }
  },
  cooldown: 5,
  usage: `prefixname [command_name]`,
  description: "Renvoie ce message",
  category: "Misc",
  permission: "Aucune",
};
