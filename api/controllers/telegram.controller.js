const axios = require("axios");

const sendMessage = async (req, res) => {
  const { message } = req.body;
  const chatId = message.chat.id;
  let reply = "Hello, you said: " + message.text;

  // Set up the Telegram Bot API endpoint and token
  const botToken = "6414301028:AAG0z_Mu3c5gfpWUsO3nkCgPARgS4ebkoVU"; // Replace with your actual bot token
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  if (message.text === "onefortoday") {
    try {
      const response = await axios.get(
        "https://young-gorge-91386-003fa2ea2657.herokuapp.com/datagen/onefortoday"
      );
      const data = response.data;

      // Process the data and send a reply back to the user
      if (data && data.hebrewStory) {
        reply = "Here is your daily story: " + data.hebrewStory;

        // Send the reply using the Telegram Bot API
        await axios.post(apiUrl, {
          chat_id: chatId,
          text: reply,
        });
      } else {
        reply = "Sorry, no daily story available.";
        await axios.post(apiUrl, {
          chat_id: chatId,
          text: reply,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      reply = "An error occurred while fetching the data.";
      await axios.post(apiUrl, {
        chat_id: chatId,
        text: reply,
      });
    }
  }

  res.status(200).end();
};

module.exports = {
  sendMessage,
};
