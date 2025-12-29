const jwt = require("jsonwebtoken");
const User = require("../models/User");

// AUTH MIDDLEWARE (JWT PROTECTION)
const authMiddleware = async (req, res, next) => {
  try {
    // 1. Check for Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided, authorization denied"
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user (without password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next(); // allow request to continue
  } catch (error) {
    return res.status(401).json({
      message: "Token is invalid or expired"
    });
  }
};

module.exports = authMiddleware;
