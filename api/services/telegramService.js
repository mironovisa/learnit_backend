const axios = require("axios");

async function sendTelegramMessage(chatId, text) {
  const botToken = "6414301028:AAG0z_Mu3c5gfpWUsO3nkCgPARgS4ebkoVU"; // Replace with your actual bot token
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await axios.post(apiUrl, {
      chat_id: chatId,
      text: text,
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

module.exports = {
  sendTelegramMessage,
};
