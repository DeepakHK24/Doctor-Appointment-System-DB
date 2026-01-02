const express = require("express");
const {
  getNotifications,
  markAsRead
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET notifications
router.get("/", authMiddleware, getNotifications);

// MARK notification as read
router.post("/read", authMiddleware, markAsRead);

module.exports = router;
