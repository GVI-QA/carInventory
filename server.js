const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const carRoutes = require("./routes/carRoutes");

const app = express(); // Create Express app
const port = process.env.PORT || 5001; // Set port

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Use the car routes
app.use("/api", carRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
