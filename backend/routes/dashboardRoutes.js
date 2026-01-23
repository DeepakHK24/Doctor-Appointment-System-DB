const express = require("express");
const router = express.Router();

const {
  patientDashboard,
  doctorDashboard,
  adminDashboard
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// PATIENT DASHBOARD
router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("patient"),
  patientDashboard
);

// DOCTOR DASHBOARD
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  doctorDashboard
);

// ADMIN DASHBOARD
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  adminDashboard
);

module.exports = router;
