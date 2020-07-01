module.exports = {
  name: "test",
  run: async (client, message, args, settings) => {
    const member = await message.guild.member(args[0]);
    await client.removeMember(member);
    console.log(await client.getAllMembers());
  },
  cooldown: 0,
};
