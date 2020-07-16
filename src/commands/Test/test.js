const { meme } = require("memejs");

module.exports = {
  name: "test",
  run: async (client, message, args, settings, memberSettings) => {
    message.react("728546006614147083");
    console.log(message.channel.messages.cache);
    let efub = "prefixskdfbosefprefix";
    console.log(
      efub
        .replace("prefix", "g")
        .replace("prefix", "g")
        .replace("prefix", "g")
        .replace("prefix", "g")
        .replace("prefix", "g")
    );
  },
  cooldown: 5,
};
