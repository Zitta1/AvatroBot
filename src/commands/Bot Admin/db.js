module.exports = {
  name: "db",
  run: async (client, message, args) => {
    if (message.author.id !== "488912326179946497") return;
    message.delete();
    switch (args[0]) {
      case "createguild": {
        await client.createGuild({
          guildID: message.guild.id,
          guildName: message.guild.name,
        });
        message.channel.send("true", { code: "js" });
        break;
      }
      case "removeguild": {
        const guild =
          client.guilds.cache.map((g) => g).filter((g) => g.id == args[1])[0] ||
          message.guild;
        await client.removeGuild(guild);
        let data = await client.getGuild(guild);
        if (data == undefined)
          return message.channel.send("La guild a été correctement supprimée");
        break;
      }
      case "getguild": {
        const guild =
          client.guilds.cache.map((g) => g).filter((g) => g.id == args[1])[0] ||
          message.guild;
        let data = await client.getGuild(guild);
        if (data == undefined)
          return message.channel.send(`aucune guilde trouvée`);
        return message.channel.send(data, { code: "js" });
        break;
      }
      case "getallguilds": {
        let data = await client.getAllGuilds();
        if (data.length == 0)
          return message.channel.send(`aucune guilde trouvée`);
        for (let i in data) {
          i = 0;
          message.channel.send(data[i], { code: "js" });
          i++;
        }
        break;
      }
      case "removeallguilds": {
        await client.removeAllGuilds();
        let data = client.getAllGuilds();
        if (data == undefined)
          return message.channel.send("Toutes les guildes ont été supprimées");
        break;
      }
      case "createmember": {
        const member =
          (await message.mentions.members.first()) ||
          (await message.guild.member(args[1])) ||
          message.member;
        await client.createMember({
          memberID: message.member.id,
          memberDisplayName: message.member.displayName,
          memberTag: message.author.tag,
          guildID: message.guild.id,
          guildName: message.guild.name,
        });
        message.channel.send("true", { code: "js" });
        break;
      }
      case "removemember": {
        const member = await message.guild.member(args[1]);
        if (!member) return client.memberNotFound();
        await client.removeMember(member);
        let data = await client.getMember(member);
        if (data == undefined)
          return message.channel.send("Le membre a été correctement supprimé");
        break;
      }
      case "getmember": {
        const member =
          message.mentions.members.first() ||
          (await message.guild.member(args[1])) ||
          message.member;
        if (!member) return client.memberNotFound();
        let data = await client.getDbMember(member, message.guild);
        if (data == undefined)
          return message.channel.send(`aucun membre trouvé`);
        return message.channel.send(data, { code: "js" });
        break;
      }
      case "getallmembers": {
        let data = await client.getAllMembers();
        if (data == undefined)
          return message.channel.send(`aucun membre trouvé`);
        for (let i in data) {
          message.channel.send(data[i], { code: "js" });
        };
        break;
      }
      case "removeallmembers": {
        await client.removeAllMembers();
        let data = await client.getAllMembers();
        if (data == undefined)
          return message.channel.send("Tous les membres ont été supprimés");
        break;
      }
    }
  },
  cooldown: 0,
  description: "configure la base de données manuellement",
  category: "Bot Admins",
};
