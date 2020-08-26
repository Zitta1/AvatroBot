module.exports = {
  name: "test",
  run: async (client, message, args, settings, memberSettings) => {
    message.react("728546006614147083");
    let user = await client.users.fetch("458218831211659264");
    user.send("what are these 4 things");
  },
  cooldown: 5,
};
