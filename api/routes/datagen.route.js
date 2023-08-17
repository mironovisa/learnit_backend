const express = require("express");
const { runCompletion } = require("../controllers/gpt.controller");
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

router.get("/oneForToday", async (req, res) => {
  // try {
  //   const dailyStory = await getDailyStoriesForToday(req, res); // Pass req and res to the function
  //   res.json(dailyStory);
  // } catch (error) {
  //   res.status(500).json({ error: "An error occurred" });
  // }
  try {
    console.log("Reached getLatestDailyStory function");
    const latestStory = await getDailyStoriesForToday();
    console.log("Latest Daily Story:", latestStory);
    res.status(200).json(latestStory);
  } catch (error) {
    console.error("Error fetching latest daily story:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
