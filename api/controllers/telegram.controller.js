const axios = require("axios");

const sendMessage = async (req, res) => {
  const { message } = req.body;
  const chatId = message.chat.id;
  const reply = "Hello, you said: " + message.text;

  // Set up the Telegram Bot API endpoint and token
  const botToken = "6414301028:AAG0z_Mu3c5gfpWUsO3nkCgPARgS4ebkoVU"; // Replace with your actual bot token
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  if (message.text === "onefortoday") {
    try {
      const response = await axios.get(
        "https://your-heroku-app-url/datagen/onefortoday"
      );
      const data = response.data;
      // Process the data and send a reply back to the user
      const reply = "Here is your daily story: " + data;
      // Send the reply using the Telegram Bot API
      await sendTelegramMessage(chatId, reply);
      res.status(200).end();
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    // Handle other messages or commands
    res.status(200).end();
  }
};

module.exports = {
  sendMessage,
};

// try {
//     // Send the reply using the Telegram Bot API
//     const response = await axios.post(apiUrl, {
//       chat_id: chatId,
//       text: reply,
//     });

//     if (response.status === 200) {
//       console.log("Reply sent successfully:", reply);
//     } else {
//       console.error("Failed to send reply:", reply);
//     }
//   } catch (error) {
//     console.error("Error sending reply:", error);
//   }
