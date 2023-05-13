const app = require("./app");
const express = require("express");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");

process.on("exit", (code) => {
  setTimeout(() => {
    console.log("Will not get displayed");
  }, 0);
  console.log("Exited with status code:", code);
});
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
const dotenv = require("dotenv");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

dotenv.config({ path: __dirname + "/config" + "/config.env" });

// Connecting to database
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server`);

  server.close(() => {
    process.exit(1);
  });
});
