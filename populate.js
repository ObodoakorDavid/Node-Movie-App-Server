/** @format */

require("dotenv").config();

const connectDB = require("./db/connect");
const Movie = require("./models/Movie");
const movieJson = require("./movies.json");

const start = async () => {
  try {
    await connectDB(`${process.env.DB_URI}`);
    console.log("DB connected!");
    console.log("Uploading...");
    await Movie.deleteMany();
    await Movie.create(movieJson);
    console.log("Movies Uploaded successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
