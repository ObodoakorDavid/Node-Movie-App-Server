/** @format */

// packages
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const connectDB = require("./db/connect");
// middlewares
const notFound = require("./middlewares/notFound");
const error = require("./middlewares/error");

// Routes
const authRouter = require("./routes/authRouter");
const bookmarkRouter = require("./routes/bookmarkRouter");
const movieRouter = require("./routes/movieRouter");

const app = express();
const port = process.env.PORT || 3001;

// ==========================================\

app.use(morgan("dev"));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use(notFound);
app.use(error);

const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    console.log(`DB Connected!`);
    app.listen(port, console.log(`Server is listening at PORT:${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
