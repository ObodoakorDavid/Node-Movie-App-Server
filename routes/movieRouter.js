/** @format */

const express = require("express");
const router = express.Router();

const {
  getAll,
  movieDetail,
  getMovies,
  getSeries,
} = require("../controllers/movieController");
const methodNotAllowed = require("../utils/methodNotAllowed");

router.route("/").get(getAll).all(methodNotAllowed);
router.route("/movies").get(getMovies).all(methodNotAllowed);
router.route("/series").get(getSeries).all(methodNotAllowed);
router.route("/:id").get(movieDetail).all(methodNotAllowed);

module.exports = router;
