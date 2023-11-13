/** @format */

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Please provide a Title"],
    },
    Year: {
      type: Number,
      required: [true, "Please provide a Year"],
    },
    Rated: {
      type: String,
      required: [true, "Please provide a Rated"],
    },
    Rating: {
      type: String,
      required: [true, "Please provide a Rating"],
    },
    Poster: {
      type: String,
      required: [true, "Please provide a Poster"],
    },
    Type: {
      type: String,
      required: [true, "Please provide a Type"],
    },
    Image: {
      type: String,
      required: [true, "Please provide an Image"],
    },
    BookmarkBy: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
