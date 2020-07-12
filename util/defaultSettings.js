module.exports = {
  DEFAULTSETTINGS: {
    prefix: ">",
    premium: false,
    modules: {
      logs: {
        enabled: false,
        description: "Consigne tous les évenements dans un salon assigné",
        logChannel: "none",
        events: {
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
      announcements: {
        welcomeMessage: {
          enabled: false,
        },
        leaveMessage: {
          enabled: false,
        },
        memberBanned: {
          enabled: false,
        },
        memberKicked: {
          enabled: false,
        },
        enabled: false,
        description: "Envoie un message préenregistré",
      },
      moderation: {
        enabled: true,
        description: "Active/Désactive les commandes de modération",
        moderatorRole: "none",
        ignoredRole: "none",
        ignoredChannels: {},
      },
      AFK: {
        enabled: false,
        description:
          "Permet à un membre de configurer un message qui sera envoyé si un autre membre le mentionne",
      },
      autoMessage: {
        enabled: false,
        description:
          "envoie un message préenregistré quand un certain message est envoyé par un membre",
      },
      autoRoles: {
        enabled: false,
        description: "Assigne un ou plusieurs rôle(s) à un nouveau membre",
      },
      reminders: {
        enabled: false,
        description:
          "Permet aux membres de configurer un message qui sera envoyé automatiquement dans un temps défini",
      },
    },
  },
};
