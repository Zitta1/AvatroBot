const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
require("dotenv").config();

const client = new Client({ messageCacheMaxSize: 1000 });
require("./util/functions")(client);
client.mongoose = require("./util/mongoose.js");
client.commands = new Collection();
client.cooldowns = new Collection();

const loadEvents = (dir = "./src/events/") => {
  readdirSync(dir).forEach((dirs) => {
    const events = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith(".js")
    );

    for (const file of events) {
      const evt = require(`./${dir}/${dirs}/${file}`);
      const evtName = file.split(".")[0];
      console.log(`Évènement ${evtName} chargé !`);
      client.on(evtName, evt.bind(null, client));
    }
  });
};

loadEvents();

const loadCommands = (dir = "./src/commands/") => {
  readdirSync(dir).forEach((dirs) => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      const props = require(`./${dir}/${dirs}/${file}`);
      const cmdName = file.split(".")[0];
      console.log(`Commande ${cmdName} chargée !`);
      client.commands.set(props.name, props);
    }
  });
};

loadCommands();

client.mongoose.init();

client.login(process.env.DISCORD_TOKEN);
