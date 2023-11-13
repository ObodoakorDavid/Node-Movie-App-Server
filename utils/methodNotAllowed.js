/** @format */

const methodNotAllowed = (req, res) => {
  console.log(req.originalUrl);
  return res
    .status(400)
    .json({
      message: `Method ${req.method} not allowed on ${req.originalUrl}`,
    });
};

module.exports = methodNotAllowed;
