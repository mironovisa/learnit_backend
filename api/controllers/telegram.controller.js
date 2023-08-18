const telegramService = require("../services/telegramService");
const datagenService = require("../services/datagen.service");

async function sendMessage(req, res) {
  const { message } = req.body;
  const chatId = message.chat.id;
  let reply = "Hello, you said: " + message.text;

  if (message.text === "/onefortoday") {
    const dailyStory = await datagenService.fetchDailyStory();
    if (dailyStory) {
      reply = "Here is your daily story: " + dailyStory;
    } else {
      reply = "Sorry, no daily story available.";
    }
  } else if (message.text === "/generatestoryrus") {
    const generatedStory = await datagenService.generateStory();
    if (generatedStory) {
      reply = "Here is a generated story: " + generatedStory;
    } else {
      reply = "Sorry, could not generate a story.";
    }
  } else if (message.text.includes("#modify")) {
    // Extract and store the modified story content
    // (Assuming modifiedStory is defined elsewhere)
    modifiedStory = message.text.replace("#modify", "").trim();
    reply = "Story modified successfully!";
  } else if (message.text === "#approve") {
    if (modifiedStory) {
      datagenService.approveStory(modifiedStory);
      reply = "Story approved and saved!";
    } else {
      reply = "No modified story to approve.";
    }
  }

  await telegramService.sendTelegramMessage(chatId, reply);
  res.status(200).end();
}

module.exports = {
  sendMessage,
};
