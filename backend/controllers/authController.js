const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER CONTROLLER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // 5. Send response
    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };
