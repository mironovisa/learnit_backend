const DailyStories = require("../../models/dailyStories.model"); // Import the DailyStories model
const cloudinaryService = require("./imageFromOpenAIToCloudinary.service");
const generateAudioAndUpload = require("../services/textToAudioUpload.service");
const axios = require("axios");

async function writeResponseToMongo(response) {
  try {
    const { generatedText, imageUrl } = response;
    // const hebrewStory = generatedText.replace("Hebrew Story:\n\n", "");

    // Translate the Hebrew story to Russian using the translation API
    const translationOptions = {
      method: "GET",
      url: "https://nlp-translation.p.rapidapi.com/v1/translate",
      params: {
        text: generatedText,
        to: "iw", // Hebrew language code
        from: "ru", // Hebrew language code
      },
      headers: {
        "X-RapidAPI-Key": "1f0300778amsh802b70dda94c401p173641jsn7206c852587f", // Replace with your actual RapidAPI key
        "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
      },
    };

    const translationResponse = await axios.request(translationOptions);
    const heStory = translationResponse.data.translated_text.iw;
    const cloudinaryImageUrl = await cloudinaryService.uploadImageToCloudinary(
      imageUrl
    );

    const audioUrl = await generateAudioAndUpload(heStory);
    // Create a new DailyStories document
    const dailyStory = new DailyStories({
      hebrewStory: heStory,
      imageUrl: cloudinaryImageUrl,
      russianStory: generatedText, // Include the translated Russian story
      audioUrl: audioUrl,
    });

    // Save the document to the database
    const savedDailyStory = await dailyStory.save();
    console.log("Response written to MongoDB:", savedDailyStory);
    return savedDailyStory;
  } catch (error) {
    console.error("Error writing response to MongoDB:", error);
  }
}

module.exports = {
  writeResponseToMongo,
};
