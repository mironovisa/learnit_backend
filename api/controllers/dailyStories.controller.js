const DailyStories = require("../../models/dailyStories.model");

const getDailyStoriesForToday = async (req, res) => {
  try {
    console.log("Reached getLatestDailyStory function");

    const latestStory = await DailyStories.findOne().sort({ createdAt: -1 });

    if (!latestStory) {
      console.log("No daily stories found.");
      return res.status(404).json({ error: "No daily stories found." });
    }

    console.log("Latest Daily Story:", latestStory.toJSON());

    res.status(200).json(latestStory.toJSON());
  } catch (error) {
    console.error("Error fetching latest daily story:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getDailyStoriesForToday,
};
