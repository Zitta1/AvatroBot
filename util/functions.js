const mongoose = require("mongoose");
const { Guild, Member, BotStats } = require("../models/index");

module.exports = (client) => {
  client.createGuild = async (guild) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild
      .save()
      .then((g) => console.log(`Nouveau serveur -> ${g.guildName}`));
    return true;
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
    return true;
  };

  client.getAllGuilds = async (value) => {
    const data = await Guild.find(value);
    if (data) return data;
    else return;
  };

  client.removeGuild = async (guild) => {
    await Guild.findOneAndDelete({ guildID: guild.id });
    return true;
  };

  client.removeAllGuilds = async () => {
    const data = await Guild.find();
    for (let i in data) {
      data[i].deleteOne();
    }
    return true;
  };

  client.createMember = async (member) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, member);
    const createMember = await new Member(merged);
    createMember.save();
    return true;
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
    return true;
  };

  client.getAllMembers = async (value) => {
    const data = await Member.find(value);
    if (data.length > 0) return data;
    else return;
  };

  client.removeMember = async (member) => {
    await Member.findOneAndDelete({ memberID: member.id });
    return true;
  };

  client.removeAllMembers = async () => {
    const data = await Member.find();
    for (let i in data) {
      data[i].deleteOne();
    }
    return true;
  };

  client.getIgnoredMembers = async () => {
    const data = await Member.find({ isIgnored: true });
    const dataClean = [];
    for (let i in data) {
      dataClean.push(data[i]._doc);
    }
    return dataClean;
  };

  client.updateModerations = async (member, guild, moderation, value) => {
    const data = await Member.findOne({
      guildID: guild.id,
      memberID: member.id,
    });
    data.moderations[moderation].push(value);
    await data.save();
    return true;
  };

  client.updateCases = async (guild, value) => {
    const data = await Guild.findOne({
      guildID: guild.id,
    });
    data.modules.moderation.cases.push(value);
    await data.save();
    return true;
  };

  client.addIgnoredRole = async (guild, value) => {
    const data = await Guild.findOne({
      guildID: guild.id,
    });
    data.modules.moderation.ignoredRoles.push(value);
    await data.save();
    return true;
  };

  client.removeIgnoredRole = async (guild, value) => {
    const data = await Guild.findOne({
      guildID: guild.id,
    });
    const ignoredRoles = data.modules.moderation.ignoredRoles;
    ignoredRoles.splice(
      ignoredRoles.findIndex((v) => v == value),
      1
    );
    await data.save();
    return true;
  };

  client.addIgnoredChannel = async (guild, value) => {
    const data = await Guild.findOne({
      guildID: guild.id,
    });
    data.modules.moderation.ignoredChannels.push(value);
    await data.save();
    return true;
  };

  client.removeIgnoredChannel = async (guild, value) => {
    const data = await Guild.findOne({
      guildID: guild.id,
    });
    const ignoredChannels = data.modules.moderation.ignoredChannels;
    ignoredChannels.splice(
      ignoredChannels.findIndex((v) => v == value),
      1
    );
    await data.save();
    return true;
  };

  client.moderationDate = async () => {
    const date = new Date()
      .toString()
      .substr(4, 17)
      .replace("Jan", "01")
      .replace("Feb", "02")
      .replace("Mar", "03")
      .replace("Apr", "04")
      .replace("May", "05")
      .replace("Jun", "06")
      .replace("Jul", "07")
      .replace("Aug", "08")
      .replace("Sep", "09")
      .replace("Oct", "10")
      .replace("Nov", "11")
      .replace("Dec", "12");
    return (
      date.split(" ").slice(0, 2).reverse().join(" ") +
      " " +
      date.substr(date.length - 10)
    );
  };

  client.addLeft = async (guild, member) => {
    const data = await Member.findOne({
      guildID: guild.id,
      memberID: member.id,
    });
    data.leftTimes++;
    await data.save();
  };

  client.resetBotStats = async () => {
    const botStats = await botstats.find();
    if (botStats.length > 0) botStats[0].remove();
    const newStats = await new BotStats({
      commandsRun: 0,
    })
      .save()
      .then((s) => console.log("botstats reset"));
    return true;
  };

  client.addCommandRun = async () => {
    const botStats = await BotStats.find();
    botStats[0].commandsRun++;
    await botStats[0].save();
    return true;
  };

  client.getBotStats = async () => {
    return await BotStats.find();
  };

  client.emotes = {
    enabled: "<:enabled:728220529303224320>",
    disabled: "<:disabled:728220530418647060>",
    loading2: "<a:loading2:728546005439479819>",
    loading: "<a:loading:728546005867561020>",
    check: "<a:check:728546006614147083>",
    xcheck: "<a:xcheck:728546007570317353>",
    vcheck: "<a:vcheck:728546008002330685>",
  };

  client.logChannel = async (guild) => {
    const settings = await client.getGuild(guild);
    return guild.channels.cache.find(ch => ch.id == settings.modules.logs.logChannel);
  };

  client.isEnabled = async (module, guild) => {
    const settings = await client.getGuild(guild);
    return settings.modules[module].enabled;
  };

  client.eventEnabled = async (event, guild) => {
    const settings = await client.getGuild(guild)
    return settings.modules.logs.events[event];
  };
};
