module.exports = async (client, guild) => {
  await client.createGuild({
    guildID: guild.id,
    guildName: guild.name
  })

  const members = guild.members.cache.map(m => m);
  for (let i in members) {
    if (members[i].user.bot) return
    await client.createMember({
      memberID: members[i].id,
      memberTag: members[i].user.tag,
      memberDisplayName: members[i].displayName,
      guildID: guild.id,
      guildName: guild.name
    });
    console.log(`${members[i].user.tag} à été créé`);
  };
  console.log(`${members.length} membre(s) ajouté(s)`);
};