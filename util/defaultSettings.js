const { truncate } = require("fs");

module.exports = {
  DEFAULTSETTINGS: {
    prefix: ">",
    modules: {
      logs: {
        enabled: false,
        eventsEnabled: {
          channelCreate: false,
          channelDelete: false,
          channelPinsUpdate: false,
          channelUpdate: false,
          emojiCreate: false,
          emojiDelete: false,
          emojiUpdate: false,
          guildBanAdd: false,
          guildBanRemove: false,
          guildMemberUpdate: false,
          guildUpdate: false,
          inviteCreate: false,
          inviteDelete: false,
          messageDelete: false,
          messageUpdate: false,
          roleCreate: false,
          roleDelete: false,
          roleUpdate: false,
          userUpdate: false,
          webhookUpdate: false,
        },
      },
      annoucements: {
        welcomeMessage: {
          enabled: false
        },
        leaveMessage: {
          enabled: false
        },
        memberBanned: {
          enabled: false
        },
        memberKicked: {
          enabled: false
        }
      },
      moderation: {
        enabled: true
      },
      AFK: {
        enabled: false
      },
      autoMessage: {
        enabled: false
      },
      autoRoles: {
        enabled: false
      },
      reminders: {
        enabled: false
      }
    }
  },
};
