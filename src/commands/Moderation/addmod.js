module.exports = {
  name: "addmod",
  aliases: ["am"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR"))
      return message.reply(
        "vous n'avez pas les permissions pour effectuer cette commande"
      );
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`veuillez spécifier un rôle`);
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    await client.updateGuild(message.guild, {
      "modules.moderation.moderatorRole": role.id,
    });
    message.channel.send(
      `${client.emotes.check} Le role ${role} à bien été défini comme rôle modérateur`
    );
  },
  cooldown: 5,
  usage: `prefixname <role>`,
  description:
    "Ajoute un rôle comme étant rôle modérateur\nLes membres possédants ce rôle pourront éxécuter les commandes de modération sans avoir les permissions",
  category: "Moderation",
  permission: "Administrateur",
};
