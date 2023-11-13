/** @format */

const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  let statusCode = err.statusCode === 200 ? 500 : err.statusCode;
  if (err.errors) {
    err.message = err.errors.email.message;
    statusCode = 400;
  } else if (err.errors) {
    err.message = err.errors.username.message;
    statusCode = 400;
  }

  if (err.code === 11000 && err.keyValue.email) {
    err.message = `User with this email already exists`;
    statusCode = 400;
  }
  if (err.code === 11000 && err.keyValue.username) {
    err.message = `User with this email already exists`;
    statusCode = 400;
  }

  err.message = !err.message
    ? '"Something went wrong, try again later"'
    : err.message;

  res.status(statusCode).json({ message: err.message });
};

module.exports = errorMiddleware;
