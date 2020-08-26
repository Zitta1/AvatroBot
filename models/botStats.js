const mongoose = require("mongoose");

const schema = mongoose.Schema({
  commandsRun: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("BotStats", schema);
