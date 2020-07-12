const ms = require("ms");

module.exports = {
  name: "ban",
  aliases: ["b"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms() && !client.isMod()) return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    let reason;
    switch (args[0]) {
      case "save":
        const member = client.getMember(args[1]);
        if (!member) return client.memberNotFound();
        let banTime;
        if (
          args[2].endsWith("s") ||
          args[2].endsWith("m") ||
          args[2].endsWith("h") ||
          args[2].endsWith("d") ||
          args[2].endsWith("w") ||
          args[2].endsWith("y")
        ) {
          banTime = args[2];
          if (args[3]) reason = args.slice(3).join(" ");
        } else if (args[2]) reason = args.slice(3).join(" ");
        member.ban({ reason: reason });
        setTimeout(() => {
          message.guild.members.unban(member.user)
        }, ms(banTime))
        break;
      case "match":
        const matched = args[1];
        if (args[2]) reason = args.slice(2).join(" ");
        const channels = message.guild.channels.cache
          .map((ch) => ch)
          .filter((ch) => ch.type == "text");
        const membersList = [];
        const messagesList = [];
        for (let i in channels) {
          const messages = channels[i].messages.cache
            .map((m) => m)
            .filter((m) => m.content.includes(matched));
          messagesList.push(messages);
        }
        console.log(messagesList);
    }
  },
  cooldown: 5,
  usage: "",
  description: "",
  category: "",
  permission: "",
};
function dc() {
  let reason;
}

