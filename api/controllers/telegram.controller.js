const axios = require("axios");

const sendMessage = async (req, res) => {
  const { message } = req.body;
  const chatId = message.chat.id;
  const reply = "Hello, you said: " + message.text;

  // Set up the Telegram Bot API endpoint and token
  const botToken = "6414301028:AAG0z_Mu3c5gfpWUsO3nkCgPARgS4ebkoVU"; // Replace with your actual bot token
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    // Send the reply using the Telegram Bot API
    const response = await axios.post(apiUrl, {
      chat_id: chatId,
      text: reply,
    });

    if (response.status === 200) {
      console.log("Reply sent successfully:", reply);
    } else {
      console.error("Failed to send reply:", reply);
    }
  } catch (error) {
    console.error("Error sending reply:", error);
  }

  res.status(200).end();
};

module.exports = {
  sendMessage,
};
