const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// REGISTER
router.post(
  "/register",
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  registerUser
);

// LOGIN
router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  loginUser
);

module.exports = router;
