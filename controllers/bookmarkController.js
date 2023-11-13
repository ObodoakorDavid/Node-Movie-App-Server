/** @format */

const Movie = require("../models/movie");
const customError = require("../middlewares/error");

// GET ALL BOOKMARKS
const getBookmarks = async (req, res) => {
  const bookmarks = await Movie.find({ BookmarkBy: req.user.userId });
  res.status(200).json({ message: "success", data: bookmarks });
};

// ADD BOOKMARK
const addBookmark = async (req, res, next) => {
  const { id } = req.params;
  const movieToAdd = await Movie.findOne({ _id: id });
  if (!movieToAdd) {
    return next(customError(404, "No Movie With The Provided ID"));
  }

  const movie = await Movie.findOneAndUpdate(
    { _id: id },
    { $push: { BookmarkBy: req.user.userId } }
  );

  res.status(200).json({ message: "Movie Bookmarked!" });
};

// REMOVE BOOKMARK
const removeBookmark = async (req, res) => {
  const { id } = req.params;
  const movieToRemove = await Movie.findOne({ _id: id });
  if (!movieToRemove) {
    return next(customError(404, "No Movie With The Provided ID"));
  }

  const movie = await Movie.findOneAndUpdate(
    { _id: id },
    { $pull: { BookmarkBy: req.user.userId } }
  );
  res.status(200).json({ message: "BookMark Removed!" });
};

module.exports = {
  getBookmarks,
  addBookmark,
  removeBookmark,
};
