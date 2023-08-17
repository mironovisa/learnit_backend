const DailyStories = require("../../models/dailyStories.model");

const getDailyStoriesForToday = async (req, res) => {
  try {
    console.log("Reached getLatestDailyStory function");

    const latestStory = await DailyStories.findOne().sort({ createdAt: -1 });

    console.log("Latest Daily Story:", latestStory);

    res.json(latestStory);
  } catch (error) {
    console.error("Error fetching latest daily story:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getDailyStoriesForToday,
};
