module.exports = {
  name: "eval",
  run: async (client, message, args, settings) => {
    function clean(text) {
      if (typeof text === 'string') {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      };
      return text
    };

    if (message.member.id !== "488912326179946497") return false;
    const code = args.join(" ");
    if (!code) return false;
    try {
      const evaled = eval(code);
      const cleanCode = await clean(evaled);
      if (String(cleanCode).includes(process.env.TOKEN || client.token)) return false;
      message.channel.send(cleanCode, { code: 'js' });
    } catch (error) {
      message.channel.send(error, { code: "js" });
    }
  }
}