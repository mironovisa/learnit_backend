const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Heroku World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
