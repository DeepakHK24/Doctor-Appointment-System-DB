const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ONLY ADMIN
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// ONLY DOCTOR
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  (req, res) => {
    res.json({ message: "Welcome Doctor" });
  }
);

module.exports = router;
