module.exports = {
  name: "delmod",
  aliases: ["deletemod", "delmoderator", "deletemoderator"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`veuillez spécifier un rôle`);
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    await client.updateGuild(message.guild, {
      "modules.moderation.moderatorRole": "none",
    });
    return message.channel.send(
      `${client.emotes.check} Le role ${role} à bien été supprimé du statut modérateur`
    );
  },
  cooldown: 5,
  usage: `prefixname <role>`,
  description: "Supprime un rôle modérateur",
  category: "Moderation",
  permission: "Administrateur",
};
