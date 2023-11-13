/** @format */

const customError = require("../utils/customError");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUNINARY_NAME,
  api_key: process.env.CLOUNINARY_API_KEY,
  api_secret: process.env.CLOUNINARY_API_SECRET,
});

//REGISTER USER
const registerUser = async (req, res, next) => {
  //grab email, password from req.body
  const { email, password } = req.body;
  if (!email) {
    return next(customError(400, "Please provide an email"));
  }

  if (!password) {
    return next(customError(400, "Please provide a password"));
  }

  try {
    //create new user on the DB
    const user = await User.create({ ...req.body });

    //generate new token
    const token = user.createJWT();
    res.status(201).json({
      id: user._id,
      token,
      image: user.image,
    });
  } catch (error) {
    return next(error);
  }
};

//LOGIN USER
const loginUser = async (req, res, next) => {
  // grab email and password from req.body
  const { email, password } = req.body;
  console.log(email);

  if (!email) {
    return next(customError(400, "Please provide an email"));
  }
  if (!password) {
    return next(customError(400, "Please provide a password"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(customError(401, "No User with this Email"));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(customError(401, "Invalid Password"));
  }

  const token = user.createJWT();

  res.status(200).json({ id: user._id, token, image: user.image });
};

//GET USER
const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });

  res.status(200).json({
    id: user._id,
    image: user.image,
  });
};

//UPDATE USER
const updateUser = async (req, res, next) => {
  //get userId from auth middleware
  const { userId } = req.user;

  //grab password and image from incoming request body
  const { password } = req.body;

  //check if image exists
  if (!req.files || !req.files.image) {
    return next(customError(400, "No Image Provided"));
  }

  //find user with the id from db
  const user = await User.findOne({ _id: userId });

  // check if password is correct
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(customError(401, "Invalid Password"));
  }

  try {
    //upload image to cloudinary and grab secureURL
    const { secure_url } = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "movie-app",
      }
    );

    //update user with new image
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        image: secure_url,
      }
    );
    return res.status(200).json({ message: "Profile Photo Updated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

// VERIFY USER
const verifyUser = () => {
  // getting the email
  // confirm the otp
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const transporter = nodemailer.createTransport({
    name: "smtp.elasticemail.com",
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
      user: process.env.ELASTIC_EMAIL,
      pass: process.env.ELASTIC_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.ELASTIC_EMAIL,
    to: "obodoakordavid@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    html: "ll",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Forgot Password", info });
  } catch (err) {
    res.status(400).json({ message: "Unable to send", err });
  }

  // email, check
  // generate a link or otp
  // localhost://3000/forgot-password?email&token=${otp}
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  res.status(200).json({ message: " Reset Password" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  resetPassword,
  updateUser,
};
