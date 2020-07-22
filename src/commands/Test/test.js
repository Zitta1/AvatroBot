module.exports = {
  name: "test",
  run: async (client, message, args, settings, memberSettings) => {
    message.react("728546006614147083");
    console.log(new Date());
  },
  cooldown: 5,
};
