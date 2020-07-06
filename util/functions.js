const mongoose = require("mongoose");
const { Guild, Member } = require("../models/index");

module.exports = (client, message, settings, memberSettings) => {
  client.createGuild = async (guild) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild
      .save()
      .then((g) => console.log(`Nouveau serveur -> ${g.guildName}`));
  };

  client.getGuild = async (guild) => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    else return;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    await data.updateOne(settings);
    return data;
  };

  client.getAllGuilds = async () => {
    const data = await Guild.find();
    if (data) return data;
    else return;
  };

  client.removeGuild = async (guild) => {
    await Guild.findOneAndDelete({ guildID: guild.id });
  };

  client.removeAllGuilds = async () => {
    const data = await Guild.find();
    for (let i in data) {
      data[i].deleteOne();
      i++;
    }
  };

  client.createMember = async (member) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, member);
    const createMember = await new Member(merged);
    createMember
      .save()
      .then((m) =>
        console.log(
          `Nouveau Membre -> ${m.memberTag} (${m.memberDisplayName} (${m.memberID}))`
        )
      );
  };

  client.getDbMember = async (member) => {
    const data = await Member.findOne({ memberID: member.id });
    if (data) return data;
    else return;
  };

  client.updateMember = async (member, memberSettings) => {
    let data = await client.getGuild(member);
    if (typeof data !== "object") data = {};
    for (const key in memberSettings) {
      if (data[key] !== memberSettings[key]) data[key] = memberSettings[key];
    }
    return data.updateOne(memberSettings);
  };

  client.getAllMembers = async () => {
    const data = await Member.find();
    if (data.length > 0) return data;
    else return;
  };

  client.removeMember = async (member) => {
    await Member.findOneAndDelete({ memberID: member.id });
  };

  client.removeAllMembers = async () => {
    const data = await Member.find();
    for (let i in data) {
      data[i].deleteOne();
      i++;
    }
  };

  client.getRole = (value) => {
    const roles =
      message.mentions.roles.first() || message.guild.roles.cache.map((r) => r);
    const role =
      roles.filter((r) => r.id == value)[0] ||
      roles.filter((r) => r.name == value)[0];
    return role;
  };

  client.getMember = (value) => {
    const member =
      message.mentions.members.first() || message.guild.member(value);
    return member;
  };

  client.isIgnored = async () => {
    const ignoredRole = settings.modules.moderation.ignoredRole;
    if (ignoredRole !== "none") {
      if (message.member.roles.map((r) => r.id).includes(ignoredRole))
        return true;
    }
    const isIgnored = memberSettings.isIgnored;
    if (isIgnored == true) return true;
    else return false;
  };

  client.isOwner = () => {
    if (message.member == message.guild.owner) return true;
    else return false;
  };

  client.memberNotFound = () => {
    return message.reply(`membre introuvable`);
  };

  client.roleNotFound = () => {
    return message.reply(`rôle introuvable`);
  };

  client.checkPerms = (value) => {
    return message.member.hasPermission(value);
  };

  client.noPerms = () => {
    return message.reply(
      `vous n'avez pas les permission requises pour éxécuter cette commande`
    );
  };

  client.getChannel = (value) => {
    const channel =
      message.guild.channels.cache
        .map((ch) => ch)
        .filter((ch) => ch.type == "text")
        .filter((ch) => ch.id == value)[0] ||
      message.guild.channels.cache
        .map((ch) => ch)
        .filter((ch) => ch.type == "text")
        .filter((ch) => ch.name == args[1])[0] ||
      message.mentions.channels.first();
    return channel;
  };

  client.channelNotFound = () => {
    return message.reply(`channel introuvable`);
  };

  client.isEnabled = (module) => {
    return settings.modules[module].enabled;
  };

  client.moduleDisabled = (module) => {
    return message.reply(
      `Le module \`${module}\`est désactivé, pour l'activer tapez \`${settings.prefix}modules ${module} enable\``
    );
  };

  client.isMod = () => {
    return message.member.roles.cache
      .map((r) => r.id)
      .includes(settings.modules.moderation.moderatorRole);
  };
};
