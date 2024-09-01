require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const { errorHandler } = require("./src/middleware");
const userRoutes = require("./src/routes/user");
const bookRoutes = require("./src/routes/book");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then((res) => {
    console.log("DB connected successfully");
  })
  .catch((e) => {
    console.log("Failed to connect BD", e);
  });

// Import Routers
app.use("/user", userRoutes);
app.use("/books", bookRoutes);

// For testing only
app.get("/test", (req, res) => {
  res.send("ok");
});

// Error handling middleware should be the last middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  `Server started on port ${process.env.PORT}`;
});

exports.module = app;
