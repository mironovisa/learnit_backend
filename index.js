const express = require("express");
const connectDB = require("./config/db");
const datagenRoutes = require("./api/routes/datagen.route");

const app = express();
const port = process.env.PORT || 3000;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/datagen", datagenRoutes);

let isMongoDBConnected = false;

// Connect to MongoDB
connectDB()
  .then((dbConnection) => {
    // Store the connection object here
    isMongoDBConnected = true;
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a route
app.get("/", async (req, res) => {
  try {
    const isConnected = await checkMongoDBConnection();

    if (isConnected) {
      res.send("Connected to MongoDB and Hello, Heroku World!");
    } else {
      res.send("Hello, Heroku World! Could not connect to MongoDB.");
    }
  } catch (error) {
    console.error("Error checking MongoDB connection:", error);
    res.send("Hello, Heroku World! An error occurred.");
  }
});

// Check MongoDB Connection
const checkMongoDBConnection = async () => {
  try {
    const dbConnection = await connectDB();
    return dbConnection.readyState === 1;
  } catch (error) {
    console.error("Error checking MongoDB connection:", error);
    return false;
  }
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
