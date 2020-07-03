const mongoose = require("mongoose");
const { Guild, Member } = require("../models/index");

module.exports = (client) => {
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
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
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
      .then((m) => console.log(`Nouveau Membre -> ${m.memberDisplayName}`));
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
};
