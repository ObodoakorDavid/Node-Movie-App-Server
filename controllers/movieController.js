/** @format */

const Movie = require("../models/movie");

// Get all data
const getAll = async (req, res) => {
  const allData = await Movie.find({});
  res.status(200).json({ message: "success", status: true, data: allData });
};

// Get all movies
const getMovies = async (req, res) => {
  const movies = await Movie.find({ Type: "movie" });
  res.status(200).json({ message: "success", status: true, data: movies });
};

// Get all series
const getSeries = async (req, res) => {
  const series = await Movie.find({ Type: "series" });
  res.status(200).json({ message: "success", status: true, data: series });
};

// Get single movie/series
const movieDetail = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findOne({ _id: id });
  if (!movie) {
    return res.status(400).json({
      message: "failed",
      status: false,
      data: `No Movie with ID:${id}`,
    });
  }
  res.status(200).json({ message: "success", staus: true, data: movie });
};

module.exports = {
  getAll,
  movieDetail,
  getMovies,
  getSeries,
};
