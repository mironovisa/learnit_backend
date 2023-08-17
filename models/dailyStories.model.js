const mongoose = require("mongoose");

const dailyStoriesSchema = new mongoose.Schema(
  {
    hebrewStory: {
      type: String,
      required: true,
    },
    russianStory: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields
  }
);

const DailyStories = mongoose.model("DailyStories", dailyStoriesSchema);

module.exports = DailyStories;
