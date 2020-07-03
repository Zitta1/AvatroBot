module.exports = {
  name: "test",
  run: async (client, message, args, settings) => {
    const setings = require("../../../util/defaultSettings");
    let data = setings.DEFAULTSETTINGS.modules.logs.enabled
    {data: true}
    console.log(settings.modules["logs"]);
  },
  cooldown: 0,
};
