const { MessageEmbed } = require("discord.js");
const { meme } = require("memejs");

module.exports = {
  name: "meme",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    const subReddits = ["LesMemesFrancais", "MemeFrancais", "memes_fr"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    meme(random, (err, data) => {
      if (err) return console.error(err);
      message.channel.send({ files: [data.url] });
    });
  },
  cooldown: 5,
  description: "Evoie un meme aléatoire",
  category: "Fun",
};
