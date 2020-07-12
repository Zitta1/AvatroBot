const { meme } = require("memejs");

module.exports = {
  name: "test",
  run: async (client, message, args, settings, memberSettings) => {
    message.react("728546006614147083");
  },
  cooldown: 5,
};
