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
  premium: {
    type: Boolean,
    default: defaults.premium,
  },
  modules: {
    logs: {
      enabled: {
        type: Boolean,
        default: defaults.modules.logs.enabled,
      },
      logChannel: {
        type: String,
        default: defaults.modules.logs.logChannel,
      },
      events: {
        channelCreate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.channelCreate,
          },
          name: { type: String, default: "Salon / catégorie créé(e)" },
          description: {
            type: String,
            default:
              "Log quand un salon textuel, un salon vocal ou un catégorie est créé(e)",
          },
          infoAvailable: {
            type: String,
            default: "Le salon / la catégorie créé(e)",
          },
        },
        channelDelete: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.channelDelete,
          },
          name: { type: String, default: "Salon / catégorie supprimé(e)" },
          description: {
            type: String,
            default:
              "Log quand un salon textuel, un salon vocal ou un catégorie est supprimé(e)",
          },
          infoAvailable: {
            type: String,
            default: "Le salon / la catégorie supprimé(e)",
          },
        },
        channelPinsUpdate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.channelPinsUpdate,
          },
          name: { type: String, default: "Messages épinglés mis à jour" },
          description: {
            type: String,
            default:
              "Log quand un message est épinglé ou retiré des messages épinglés",
          },
          infoAvailable: {
            type: String,
            default:
              "Le salon textuel où les messages épinglés ont été modifié",
          },
        },
        channelUpdate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.channelUpdate,
          },
          name: {
            type: String,
            default: "Salon / catégorie mis(e) à jour",
          },
          description: {
            type: String,
            default:
              "Log quand un salon textuel, un salon vocal ou un catégorie à été modifié",
          },
          infoAvailable: {
            type: String,
            default: "Les modifications apportées au salon / à la catégorie",
          },
        },
        emojiCreate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.emojiCreate,
          },
          name: { type: String, default: "Émoji créé" },
          description: { type: String, default: "Log quand un émoji est créé" },
          infoAvailable: {
            type: String,
            default: "L'émoji créé",
          },
        },
        emojiDelete: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.emojiDelete,
          },
          name: { type: String, default: "Émoji supprimé" },
          description: {
            type: String,
            default: "Log quand un émoji est supprimé",
          },
          infoAvailable: {
            type: String,
            default: "L'émoji supprimé",
          },
        },
        emojiUpdate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.emojiUpdate,
          },
          name: { type: String, default: "Émoji mis à jour" },
          description: {
            type: String,
            default: "Log quand un émoji est modifié",
          },
          infoAvailable: {
            type: String,
            default: "Les modifications apportées à l'emoji",
          },
        },
        guildMemberUpdate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.guildMemberUpdate,
          },
          name: { type: String, default: "Membre modifié" },
          description: {
            type: String,
            default:
              "Log quand un membre à été modifié (permissions, pseudo, rôles, etc...)",
          },
          infoAvailable: {
            type: String,
            default: "Les modifications apportées au membre",
          },
        },
        guildUpdate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.guildUpdate,
          },
          name: { type: String, default: "Serveur modifié" },
          description: {
            type: String,
            default: "Log quand le serveur à été modifié",
          },
          infoAvailable: {
            type: String,
            default: "Les modifications apportées au serveur",
          },
        },
        inviteCreate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.inviteCreate,
          },
          name: { type: String, default: "Invitation créée" },
          description: {
            type: String,
            default:
              "Log quand une invitation à été créée\n**NB:** le bot dois avoir la permission de gérer le serveur",
          },
          infoAvailable: {
            type: String,
            default: "L'invitation créée",
          },
        },
        inviteDelete: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.inviteDelete,
          },
          name: { type: String, default: "Ivitation supprimée" },
          description: {
            type: String,
            default:
              "Log quand une invitation est supprimée\n**NB:** le bot dois avoir la permission de gérer le serveur",
          },
          infoAvailable: {
            type: String,
            default: "L'invitation supprimée",
          },
        },
        messageDelete: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.messageDelete,
          },
          name: { type: String, default: "Message supprimé" },
          description: {
            type: String,
            default: "Log quand un message est supprimé",
          },
          infoAvailable: {
            type: String,
            default: "Le contenu du message supprimé",
          },
        },
        messageDeleteBulk: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.messageDelete,
          },
          name: { type: String, default: "Messages supprimés en série" },
          description: {
            type: String,
            default:
              "Log quand des messages sont supprimés en série (typiquement: quand une commande purge est exécutée)",
          },
          infoAvailable: {
            type: String,
            default: "Le contenu des messages supprimés",
          },
        },
        messageUpdate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.messageUpdate,
          },
          name: { type: String, deafult: "Message modifié" },
          description: {
            type: String,
            default: "Log quand un message est modifié",
          },
          infoAvailable: {
            type: String,
            default:
              "le contenu de l'ancien message, le contenu du nouveau message",
          },
        },
        roleCreate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.roleCreate,
          },
          name: { type: String, default: "Rôle créé" },
          description: {
            type: String,
            default: "Log quand un rôle est créé",
          },
          infoAvailable: {
            type: String,
            default: "Le rôle créé",
          },
        },
        roleDelete: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.roleDelete,
          },
          name: { type: String, default: "Rôle supprimé" },
          description: {
            type: String,
            default: "Log quand un rôle est supprimé",
          },
          infoAvailable: {
            type: String,
            default: "Le rôle supprimé",
          },
        },
        roleUpdate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.roleUpdate,
          },
          name: { type: String, default: "Rôle modifié" },
          description: {
            type: String,
            default: "Log quand un rôle est modifié",
          },
          infoAvailable: {
            type: String,
            default: "Les modifications apportées au rôle",
          },
        },
        userUpdate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.userUpdate,
          },
          name: { type: String, default: "Utilisateur modifié" },
          description: {
            type: String,
            default:
              "Log quand un utilisateur est modifié (tag, photo de profile, etc...)",
          },
          infoAvailable: {
            type: String,
            default: "Les modifications apportées à l'utilisateur",
          },
        },
        webhookUpdate: {
          enabled: {
            type: Boolean,
            default: defaults.modules.logs.events.webhookUpdate,
          },
          name: { type: String, default: "Webhook modifié" },
          description: {
            type: String,
            default: "Log quand un webhook est ajouté / supprimé / modifié",
          },
          infoAvailable: {
            type: String,
            default: "Le salon du webhook",
          },
        },
        description: {
          type: String,
          default: defaults.modules.logs.description,
        },
      },
    },
    announcements: {
      welcomeMessage: {
        enabled: {
          type: Boolean,
          default: defaults.modules.announcements.welcomeMessage.enabled,
        },
      },
      leaveMessage: {
        enabled: {
          type: Boolean,
          default: defaults.modules.announcements.leaveMessage.enabled,
        },
      },
      memberBanned: {
        enabled: {
          type: Boolean,
          default: defaults.modules.announcements.memberBanned.enabled,
        },
      },
      memberKicked: {
        enabled: {
          type: Boolean,
          default: defaults.modules.announcements.memberKicked.enabled,
        },
      },
      enabled: {
        type: Boolean,
        default: defaults.modules.announcements.enabled,
      },
      description: {
        type: String,
        default: defaults.modules.announcements.description,
      },
    },
    moderation: {
      enabled: {
        type: Boolean,
        default: defaults.modules.moderation.enabled,
      },
      moderatorRole: {
        type: String,
        default: defaults.modules.moderation.moderatorRole,
      },
      ignoredRole: {
        type: String,
        default: defaults.modules.moderation.ignoredRole,
      },
      description: {
        type: String,
        default: defaults.modules.moderation.description,
      },
      ignoredChannels: {
        type: Object,
        default: defaults.modules.moderation.ignoredChannels,
      },
    },
    AFK: {
      enabled: {
        type: Boolean,
        default: defaults.modules.AFK.enabled,
      },
      description: {
        type: String,
        default: defaults.modules.AFK.description,
      },
    },
    autoMessage: {
      enabled: {
        type: Boolean,
        default: defaults.modules.autoMessage.enabled,
      },
      description: {
        type: String,
        default: defaults.modules.autoMessage.description,
      },
    },
    autoRoles: {
      enabled: {
        type: Boolean,
        default: defaults.modules.autoRoles.enabled,
      },
      description: {
        type: String,
        default: defaults.modules.autoRoles.description,
      },
    },
    reminders: {
      enabled: {
        type: Boolean,
        default: defaults.modules.reminders.enabled,
      },
      description: {
        type: String,
        default: defaults.modules.reminders.description,
      },
    },
  },
});

module.exports = mongoose.model("Guild", guildSchema);
