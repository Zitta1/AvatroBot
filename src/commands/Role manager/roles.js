// Gérer le split()

module.exports = {
  name: "roles",
  run: async (client, message, args, settings) => {
    if (client.isIgnored() == true) return;
    if (!client.checkPerms("MANAGE_ROLES")) return client.noPerms();
    message.delete();
    const roles = message.guild.roles.cache
      .map((r) => r.name)
      .filter((r) => r !== "@everyone")
      .join("\n");
    if (!roles) return message.channel.send(`\`\`\`no roles\`\`\``);
    else message.channel.send(`\`\`\`${roles}\`\`\``);
  },
  cooldown: 5,
  description: "Renvoie la liste de tous les roles du serveur",
  category: "Role Manager",
  permission: "Gérer les rôles",
};
