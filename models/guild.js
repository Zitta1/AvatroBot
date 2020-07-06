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
      description: {
        type: String,
        default: defaults.modules.logs.description
      }
    },
    announcements: {
      welcomeMessage: {
        enabled: {
          type: Boolean,
          default: defaults.modules.announcements.welcomeMessage.enabled
        },
      },
      leaveMessage: {
        enabled: {
          type: Boolean,
          default: defaults.modules.announcements.leaveMessage.enabled
        },
      },
      memberBanned: {
        enabled: {
          type: Boolean,
          default: defaults.modules.announcements.memberBanned.enabled
        },
      },
      memberKicked: {
        enabled: {
          type: Boolean,
          default: defaults.modules.announcements.memberKicked.enabled
        },
      },
      enabled: {
        type: Boolean,
        default: defaults.modules.announcements.enabled
      },
      description: {
        type: String,
        default: defaults.modules.announcements.description
      }
    },
    moderation: {
      enabled: {
        type: Boolean,
        default: defaults.modules.moderation.enabled
      },
      moderatorRole: {
        type: String,
        default: defaults.modules.moderation.moderatorRole
      },
      ignoredRole: {
        type: String,
        default: defaults.modules.moderation.ignoredRole
      },
      description: {
        type: String,
        default: defaults.modules.moderation.description
      }
    },
    AFK: {
      enabled: {
        type: Boolean,
        default: defaults.modules.AFK.enabled
      },
      description: {
        type: String,
        default: defaults.modules.AFK.description
      }
    },
    autoMessage: {
      enabled: {
        type: Boolean,
        default: defaults.modules.autoMessage.enabled
      },
      description: {
        type: String,
        default: defaults.modules.autoMessage.description
      }
    },
    autoRoles: {
      enabled: {
        type: Boolean,
        default: defaults.modules.autoRoles.enabled
      },
      description: {
        type: String,
        default: defaults.modules.autoRoles.description
      }
    },
    reminders: {
      enabled: {
        type: Boolean,
        default: defaults.modules.reminders.enabled
      },
      description: {
        type: String,
        default: defaults.modules.reminders.description
      }
    },
  },
});

module.exports = mongoose.model("Guild", guildSchema);
