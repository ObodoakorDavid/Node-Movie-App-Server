/** @format */

const express = require("express");
const router = express.Router();

const {
  getBookmarks,
  addBookmark,
  removeBookmark,
} = require("../controllers/bookmarkController");

const auth = require("../middlewares/auth");
const methodNotAllowed = require("../utils/methodNotAllowed");

router.route("/").get(auth, getBookmarks).all(methodNotAllowed);
router.route("/add/:id").get(auth, addBookmark).all(methodNotAllowed);
router.route("/remove/:id").get(auth, removeBookmark).all(methodNotAllowed);

module.exports = router;
