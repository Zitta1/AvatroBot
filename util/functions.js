const mongoose = require("mongoose");
const { Guild, Member } = require("../models/index");


module.exports = client => {
  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild.save().then((g) => console.log(`Nouveau serveur -> ${g.guildName}`));
  };

  client.getGuild = async (guild) => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    return client.config.defaultSettings;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
  client.createMember = async member => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, member);
    const createMember = await new Member(merged);
    createMember.save().then((m) => console.log(`Nouveau Membre -> ${m.nickname}`));
  };

  client.getMember = async (member) => {
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
    if (data) return data;
    else return;
  };

  client.removeMember = async (member) => {
    const data = await Member.findOneAndDelete({ memberID: member.id });
  };
};