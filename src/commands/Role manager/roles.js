module.exports = {
  name: "roles",
  run: async (client, message, args, settings) => {
    const roles = message.guild.roles.cache
      .map((r) => r.name)
      .filter((r) => r !== "@everyone")
      .join("\n");
    if (!roles) return message.channel.send("```no roles```");
    else message.channel.send(`\`\`\`${roles}\`\`\``);
  },
  cooldown: 5,
  description: "Renvoie la liste de tous les roles du serveur",
  category: "role manager",
};
