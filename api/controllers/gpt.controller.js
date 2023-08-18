const { Configuration, OpenAIApi } = require("openai");
const dailyStoriesService = require("../services/dailyStoriesToMongo.service");

// Load environment variables from .env file
require("dotenv").config();

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function runCompletion(req, res) {
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates stories in Russian about live in Israel. You generate simple, but interesting stories. You take care of that the details of your story aren't too complicated. ",
      },
      {
        role: "user",
        content:
          "You have to generate a 3 sentences story in Russian. The story should be very simple as for kids of age 7-9, who only started to prepare for their immigration to Israel. The story should be complete and interesting. It should be about simple things, people with jewish names, locations in Israel, foods and traditions. It should never be a lie, it should operate only proved facts, it should always be live-like and loveful stories. No more than 300 words all together.",
      },
    ],
    max_tokens: 600,
  });

  const generatedText = completion.data.choices[0].message.content;

  // Step 2: GPT-4 generates a prompt for DALL-E based on the story
  const promptGeneration = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a creative assistant that generates a prompt for DALL-E.",
      },
      {
        role: "user",
        content: `Generate a prompt for DALL-E based on the following story: ${generatedText}. The prompt should lead to a highly detailed and captivating image for a kids' book, image should always be looking pretty naive, never never drawing too realistic, only like cartoon, try to always keep generating images as if it was in a kids book - lovely and nice. Never draw dialogue clouds or text. If drawing detailed face - take super special care of this, it should never be incomplete or scare people. Include warm colors and try to accurately stick to the story plot and an enchanting scene that sparks imagination.`,
      },
    ],
    max_tokens: 600,
  });

  const dallEPrompt = promptGeneration.data.choices[0].message.content;

  try {
    // Step 3: Generate an image using DALL-E based on the DALL-E prompt
    const imageGeneration = await openai.createImage({
      prompt: dallEPrompt,
      n: 1,
      size: "512x512",
    });

    const imageUrl = imageGeneration.data.data[0].url;
    const response = {
      imageUrl,
      generatedText,
    };
    console.log("Response:", response);
    const savedDailyStory = await dailyStoriesService.writeResponseToMongo(
      response
    );
    res.json(savedDailyStory); // Send the response as JSON
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ error: "Error generating image" }); // Handle errors
  }
}

async function generateStoryStep1() {
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates stories in Russian about life in Israel. You generate simple, but interesting stories. You take care that the details of your story aren't too complicated. ",
      },
      {
        role: "user",
        content:
          "You have to generate a 3-sentence story in Russian. The story should be very simple for kids of age 7-9, who have only started to prepare for their immigration to Israel. The story should be complete and interesting. It should be about simple things, people with Jewish names, locations in Israel, foods, and traditions. It should never be a lie; it should operate only on proven facts. It should always be lifelike and full of love. No more than 300 words in total.",
      },
    ],
    max_tokens: 600,
  });

  const generatedText = completion.data.choices[0].message.content;

  return generatedText;
}

module.exports = { runCompletion, generateStoryStep1 };
