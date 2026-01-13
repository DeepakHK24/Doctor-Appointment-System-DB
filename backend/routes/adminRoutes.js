const express = require("express");
const {
  getAdminStats,
  getDoctorApplications,
  updateDoctorStatus
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ADMIN DASHBOARD
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("admin"),
  getAdminStats
);

// VIEW DOCTOR APPLICATIONS
router.get(
  "/doctor-applications",
  authMiddleware,
  roleMiddleware("admin"),
  getDoctorApplications
);

// APPROVE / REJECT DOCTOR
router.post(
  "/update-doctor-status",
  authMiddleware,
  roleMiddleware("admin"),
  updateDoctorStatus
);

module.exports = router;
