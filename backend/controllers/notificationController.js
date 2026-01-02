const Notification = require("../models/Notification");

// GET ALL NOTIFICATIONS FOR LOGGED-IN USER
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// MARK NOTIFICATION AS READ
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;

    await Notification.findByIdAndUpdate(notificationId, {
      isRead: true
    });

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getNotifications,
  markAsRead
};
