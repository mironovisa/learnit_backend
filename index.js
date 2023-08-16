const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Heroku World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
