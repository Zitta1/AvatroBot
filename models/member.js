const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  memberID: String,
  memberDisplayName: String,
  guildID: String,
  guildName: String,
});

module.exports = mongoose.model("Member", memberSchema);