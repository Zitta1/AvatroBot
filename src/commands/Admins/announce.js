module.exports = {
  name: "announce",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (args[0] == "everyone") {
      if (!args[1])
        return message.reply(
          `vous devez indiquer un channel ou le message sera posté`
        );
      const channel = client.getChannel(args[1]);
      if (!channel) return client.channelNotFound();
      if (!args[2])
        return message.reply(`vous devez indiquer un message à envoyer`);
      message.react("728546006614147083");
      channel.send(`@everyone ${args.slice(2).join(" ")}`);
    } else if (args[0] == "here") {
      if (!args[1])
        return message.reply(
          `vous devez indiquer un channel ou le message sera posté`
        );
      const channel = client.getChannel(args[1]);
      if (!channel) return client.channelNotFound();
      if (!args[2])
        return message.reply(`vous devez indiquer un message à envoyer`);
      message.react("728546006614147083");
      channel.send(`@here ${args.slice(2).join(" ")}`);
    } else if (args[0] == "role") {
      if (!args[1])
        return message.reply(`vous devez indiquer un rôle qui sera mentionné`);
      if (!args[2])
        return message.reply(
          `vous devez indiquer un channel ou le message sera posté`
        );
      const role = client.getRole(args[1]);
      if (!role) return client.roleNotFound();
      const channel = client.getChannel(args[2]);
      if (!channel) return client.channelNotFound();
      if (!args[3])
        return message.reply(`vous devez indiquer un message à envoyer`);
      message.react("728546006614147083");
      channel.send(`${role} ${args.slice(3).join(" ")}`);
    } else {
      if (!args[0])
        return message.reply(
          `vous devez indiquer un channel ou le message sera posté`
        );
      const channel = client.getChannel(args[0]);
      if (!channel) return client.channelNotFound();
      if (!args[1])
        return message.reply(`vous devez indiquer un message à envoyer`);
      message.react("728546006614147083");
      channel.send(args.slice(1).join(" "));
    }
    setTimeout(() => message.delete(), 30000);
  },
  cooldown: 5,
  usage:
    "<channel> <message>\neveryone <channel> <message>\nhere <channel> <message>\nrole <role_mention || role_name || role_id> <channel> <message>",
  description:
    "Envoie un message dans un salon textuel défini, avec la mention here/everyone ou la mention d'un rôle en option",
  category: "Admins",
  permission: "Administrateur",
};
