const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  memberID: String,
  memberDisplayName: String,
  memberTag: String,
  guildID: String,
  guildName: String,
  moderations: {
    type: Object,
    default: {},
  },
  isIgnored: {
    type: Boolean,
    default: false,
  },
  rolePersist: {
    type: Object,
    default: {},
  },
  afk: {
    type: Object,
    default: {},
  },
  leftTimes: {
    type: Number,
    default: 0,
  },
  hasLeft: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Member", memberSchema);
