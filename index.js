const express = require("express");
const connectDB = require("./config/db");
const datagenRoutes = require("./api/routes/datagen.route");
const telegramRoutes = require("./api/routes/telegram.route");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const port = process.env.PORT || 3000;

// Set up middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/datagen", datagenRoutes);
app.use("/telegram", telegramRoutes);

let isMongoDBConnected = false;

// Connect to MongoDB
connectDB()
  .then(() => {
    isMongoDBConnected = true;
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a route
app.get("/", (req, res) => {
  if (isMongoDBConnected) {
    res.send("Connected to MongoDB and Hello, Heroku World!");
  } else {
    res.send("Hello, Heroku World!");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
