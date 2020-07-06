module.exports = {
  name: "test",
  run: async (client, message, args, settings) => {
    message.react("728546006614147083");
    console.log(client.isIgnored() == true);
  },
  cooldown: 0,
};
