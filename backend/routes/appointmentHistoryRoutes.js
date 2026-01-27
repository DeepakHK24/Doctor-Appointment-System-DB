const express = require("express");
const router = express.Router();

const {
  patientAppointmentHistory,
  doctorAppointmentHistory,
  appointmentAnalytics
} = require("../controllers/appointmentHistoryController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// PATIENT HISTORY
router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("patient"),
  patientAppointmentHistory
);

// DOCTOR HISTORY
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  doctorAppointmentHistory
);

// ANALYTICS (patient or doctor)
router.get(
  "/analytics",
  authMiddleware,
  appointmentAnalytics
);

module.exports = router;
