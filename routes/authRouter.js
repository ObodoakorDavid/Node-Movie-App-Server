/** @format */

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  resetPassword,
  updateUser,
} = require("../controllers/authController");

const auth = require("../middlewares/auth");
const methodNotAllowed = require("../utils/methodNotAllowed");

router.route("/register").post(registerUser).all(methodNotAllowed);
router.route("/login").post(loginUser).all(methodNotAllowed);
router
  .route("/user")
  .get(auth, getUser)
  .post(auth, updateUser)
  .all(methodNotAllowed);
router.route("/password/forgot").post(forgotPassword).all(methodNotAllowed);
router.route("/password/reset").post(resetPassword).all(methodNotAllowed);

module.exports = router;
