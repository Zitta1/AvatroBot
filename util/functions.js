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

  client.getAllGuilds = async (value) => {
    const data = await Guild.find(value);
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
    createMember.save();
  };

  client.getDbMember = async (member, guild) => {
    const data = await Member.findOne({
      guildID: guild.id,
      memberID: member.id,
    });
    if (data) return data;
    else return;
  };

  client.updateMember = async (member, guild, way, newSettings) => {
    const data = await Member.findOne({
      guildID: guild.id,
      memberID: member.id,
    });
    data[way] = newSettings;
    await data.save();
  };

  client.getAllMembers = async (value) => {
    const data = await Member.find(value);
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
