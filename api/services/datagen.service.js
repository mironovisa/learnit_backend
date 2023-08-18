const axios = require("axios");

let approvedStory = null; // Initialize with no approved story

async function fetchDailyStory() {
  try {
    const response = await axios.get(
      "https://young-gorge-91386-003fa2ea2657.herokuapp.com/datagen/onefortoday"
    );
    return response.data.hebrewStory || null;
  } catch (error) {
    console.error("Error fetching daily story:", error);
    return null;
  }
}

async function generateStory() {
  try {
    if (approvedStory) {
      // Use approved story if available
      return approvedStory;
    }

    const response = await axios.get(
      "https://young-gorge-91386-003fa2ea2657.herokuapp.com/datagen/generatestoryrus"
    );
    return response.data.generatedText || null;
  } catch (error) {
    console.error("Error generating story:", error);
    return null;
  }
}

function approveStory(story) {
  approvedStory = story;
}

module.exports = {
  fetchDailyStory,
  generateStory,
  approveStory,
};
