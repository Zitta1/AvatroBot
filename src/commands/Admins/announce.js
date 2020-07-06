module.exports = {
  name: "announce",
  run: async (client, message, args, settings) => {
    if (client.isIgnored() == true) return;
    message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (args[0] == "everyone") {
      const channel = client.getChannel(args[1]);
      if (!channel) return client.channelNotFound();
      message.react("728546006614147083");
      return channel.send(`@everyone ${args.slice(2).join(" ")}`);
    }

    if (args[0] == "here") {
      const channel = client.getChannel(args[1]);
      if (!channel) return client.channelNotFound();
      message.react("728546006614147083");
      return channel.send(`@here ${args.slice(2).join(" ")}`);
    }

    if (args[0] == "role") {
      const role = client.getRole(args[1]);
      if (!role) return client.roleNotFound();
      const channel = client.getChannel(args[2]);
      if (!channel) return client.channelNotFound();
      message.react("728546006614147083");
      return channel.send(`${role} ${args.slice(3).join(" ")}`);
    } else {
      const channel = client.getChannel(args[0]);
      if (!channel) return client.channelNotFound();
      message.react("728546006614147083");
      return channel.send(args.slice(1).join(" "));
    }
  },
  cooldown: 5,
  usage:
    "<channel> <message>\neveryone <channel> <message>\nhere <channel> <message>\nrole <role_mention || role_name || role_id> <channel> <message>",
  description:
    "Envoie un message dans un salon textuel défini, avec la mention here/everyone ou la mention d'un rôle en option",
  category: "Admins",
  permission: "Administrateur",
};
