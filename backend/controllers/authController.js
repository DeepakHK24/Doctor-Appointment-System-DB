const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// GENERATE JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};

// REGISTER
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "patient"
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// LOGIN
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser
};
