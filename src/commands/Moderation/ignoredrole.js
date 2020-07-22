module.exports = {
  name: "ignoredrole",
  aliases: ["ir"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    let ignoredRole = settings.modules.moderation.ignoredRole;
    if (ignoredRole == "none") return message.channel.send("Aucun rôle ignoré");
    return message.channel.send(
      `Le rôle <@&${ignoredRole}> est actuellement ignoré`
    );
  },
  cooldown: 5,
  description: "Renvoie le rôle ignoré",
  category: "Moderation",
  permission: "Administrateur",
};
