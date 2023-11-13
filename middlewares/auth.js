/** @format */

const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(customError(401, "No Token Provided"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    console.log(error);
    return next(customError(401, "Invalid Token"));
  }
};

module.exports = auth;
