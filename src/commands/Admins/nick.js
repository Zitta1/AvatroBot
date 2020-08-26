module.exports = {
  name: "nick",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (!client.hasPerm("CHANGE_NICKNAME")) return client.hasNoPerm("changer le pseudo");
    if (!args[0]) return message.reply("veuillez indiquer un nouveau pseudo");
    const newNick = args.join(" ");
    if (newNick.length > 32) return message.reply("le nouveau pseudo ne doit pas contenir plus de 32 caractères");
    const bot = message.guild.members.resolve(client.user);
    bot.setNickname(newNick);
    message.channel.send(`${client.emotes.check} Pseudo changé en ${client.user}`);
  },
  cooldown: 5,
  usage: "prefixname <new_nickname>",
  description: "Change le pseudo du bot",
  category: "Admin",
  permission: "Gérer les pseudos",
};