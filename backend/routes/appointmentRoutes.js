const express = require("express");
const {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/**
 * PATIENT → BOOK APPOINTMENT
 */
router.post(
  "/book",
  authMiddleware,
  roleMiddleware("patient"),
  bookAppointment
);

/**
 * PATIENT → VIEW OWN APPOINTMENTS
 */
router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("patient"),
  getPatientAppointments
);

/**
 * DOCTOR → VIEW OWN APPOINTMENTS
 */
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorAppointments
);

/**
 * DOCTOR → UPDATE STATUS
 */
router.post(
  "/update-status",
  authMiddleware,
  roleMiddleware("doctor"),
  updateAppointmentStatus
);

/**
 * PATIENT or DOCTOR → CANCEL APPOINTMENT
 */
router.post(
  "/cancel",
  authMiddleware,
  cancelAppointment
);

module.exports = router;
