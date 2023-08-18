const express = require("express");
const {
  runCompletion,
  generateStoryStep1,
} = require("../controllers/gpt.controller");
const {
  getDailyStoriesForToday,
} = require("../controllers/dailyStories.controller");
const router = express.Router();

router.get("/generatedailytext", async (req, res) => {
  try {
    await runCompletion(req, res); // Pass req and res to the function
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
router.get("/generatestoryrus", async (req, res) => {
  try {
    const generatedText = await generateStoryStep1();
    res.json({ generatedText }); // Send the generatedText as JSON
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
router.get("/onefortoday", getDailyStoriesForToday);

module.exports = router;
