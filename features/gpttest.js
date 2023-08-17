const { Configuration, OpenAIApi } = require("openai");

// Load environment variables from .env file
require("dotenv").config();

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function runCompletion() {
  // Step 1: GPT-4 generates a story
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that translates a story from Hebrew to Russian.",
      },
      {
        role: "user",
        content:
          "You have to generate a 4 sentences story in Hebrew. The story should be very simple as for people who only started to prepare for their immigration to Israel. The story should be complete and interesting. No more than 300 words all together. Below the story send the translation of it in Russian language.",
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
        content: `Generate a prompt for DALL-E based on the following story: ${generatedText}. The prompt should lead to a highly detailed and captivating image for a kids' book. Include warm colors, beautiful faces, and an enchanting scene that sparks imagination.`,
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
    return response;
  } catch (error) {
    console.error("Error generating image:", error.message);
  }
}

module.exports = { runCompletion };
