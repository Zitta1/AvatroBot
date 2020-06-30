const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../util/defaultSettings.js");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: {
    type: String,
    default: defaults.prefix,
  },
  modules: {
    logs: {
      enabled: {
        type: Boolean,
        default: defaults.modules.logs.enabled
      },
      eventsEnabled: {
        channelCreate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.channelCreate
        },
        channelDelete: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.channelDelete
        },
        channelPinsUpdate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.channelPinsUpdate
        },
        channelUpdate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.channelUpdate
        },
        emojiCreate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.emojiCreate
        },
        emojiDelete: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.emojiDelete
        },
        emojiUpdate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.emojiUpdate
        },
        guildBanAdd: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.guildBanAdd
        },
        guildBanRemove: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.guildBanRemove
        },
        guildMemberUpdate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.guildMemberUpdate
        },
        guildUpdate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.guildUpdate
        },
        inviteCreate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.inviteCreate
        },
        inviteDelete: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.inviteDelete
        },
        messageDelete: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.messageDelete
        },
        messageUpdate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.messageUpdate
        },
        roleCreate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.roleCreate
        },
        roleDelete: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.roleDelete
        },
        roleUpdate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.roleUpdate
        },
        userUpdate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.userUpdate
        },
        webhookUpdate: {
          type: Boolean,
          default: defaults.modules.logs.eventsEnabled.webhookUpdate
        },
      },
    },
    annoucements: {
      welcomeMessage: {
        enabled: {
          type: Boolean,
          default: defaults.modules.annoucements.welcomeMessage.enabled
        },
      },
      leaveMessage: {
        enabled: {
          type: Boolean,
          default: defaults.modules.annoucements.leaveMessage.enabled
        },
      },
      memberBanned: {
        enabled: {
          type: Boolean,
          default: defaults.modules.annoucements.memberBanned.enabled
        },
      },
      memberKicked: {
        enabled: {
          type: Boolean,
          default: defaults.modules.annoucements.memberKicked.enabled
        },
      },
    },
    moderation: {
      enabled: {
        type: Boolean,
        default: defaults.modules.moderation.enabled
      },
    },
    AFK: {
      enabled: {
        type: Boolean,
        default: defaults.modules.AFK.enabled
      },
    },
    autoMessage: {
      enabled: {
        type: Boolean,
        default: defaults.modules.autoMessage.enabled
      },
    },
    autoRoles: {
      enabled: {
        type: Boolean,
        default: defaults.modules.autoRoles.enabled
      },
    },
    reminders: {
      enabled: {
        type: Boolean,
        default: defaults.modules.reminders.enabled
      },
    },
  },
});

module.exports = mongoose.model("Guild", guildSchema);
