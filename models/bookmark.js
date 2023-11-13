/** @format */

const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
  {
    // Title: {
    //   type: String,
    //   required: [true, "Please provide a Title"],
    // },
    // Year: {
    //   type: Number,
    //   required: [true, "Please provide a Year"],
    // },
    // Rated: {
    //   type: String,
    //   required: [true, "Please provide a Rated"],
    // },
    // Poster: {
    //   type: String,
    //   required: [true, "Please provide a Poster"],
    // },
    // Image: {
    //   type: String,
    //   required: [true, "Please provide an Image"],
    // },
    bookmarks: {
      type: Array,
      default: [],
    },
    ownedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);
