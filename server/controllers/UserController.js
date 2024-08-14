// userController.js

const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const dotenv = require("dotenv");
dotenv.config();

const userController = {
  userRegister: async (req, res) => {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res
        .json({ message: "All credentials are required !!", success: false });
    }

    try {
      if (!validator.isEmail(email)) {
        return res.json({
          message: "Enter a valid email !!!",
          success: false,
        });
      }
      if (password.length < 8) {
        return res.json({
          message: "Password should be at least 8 characters long !!!",
          success: false,
        });
      }

      const user = await User.findOne({ email: email });
      if (user) {
        return res.json({
          message:
            "User with this email already exists. Please try another email or login.",
          success: false,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const newUser = await User.create({ name, password: hashedPass, email });
      await newUser.save();

      return res.status(200).json({
        message: "User registered successfully",
        success: true,
        user: newUser,
      });
    } catch (error) {
      console.error("User Registration failed:", error);
      return res.status(500).json({
        message: "User Registration failed. Internal error.",
        success: false,
        error: error.message,
      });
    }
  },
  userLogin: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .json({ message: "All credentials are required !!", success: false });
    }
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.json({
          message: "User with this email does not exist !!! Please register.",
          success: false,
        });
      }
      const isCorrectPass = await bcrypt.compare(password, user.password);
      if (!isCorrectPass) {
        return res.json({
          message: "Wrong password !!! Try again.",
          success: false,
        });
      }
      const secreteKey = process.env.JWT_SECRET_KEY||"JWT#KEY" ;
      const token = await jwt.sign({ user: user._id }, secreteKey, {
        expiresIn: "2d",
      });
      return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        token: token,
      });
    } catch (error) {
      console.error("User Login failed:", error);
      return res.status(500).json({
        message: "Failed to login. Internal error.",
        success: false,
        error: error.message,
      });
    }
  },
};

module.exports = userController;
