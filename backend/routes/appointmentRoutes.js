const express = require("express");
const {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  rescheduleAppointment
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/book", authMiddleware, roleMiddleware("patient"), bookAppointment);
router.get("/patient", authMiddleware, roleMiddleware("patient"), getPatientAppointments);
router.get("/doctor", authMiddleware, roleMiddleware("doctor"), getDoctorAppointments);
router.post("/update-status", authMiddleware, roleMiddleware("doctor"), updateAppointmentStatus);
router.post("/cancel", authMiddleware, cancelAppointment);
router.post("/reschedule", authMiddleware, roleMiddleware("patient"), rescheduleAppointment);

module.exports = router;
