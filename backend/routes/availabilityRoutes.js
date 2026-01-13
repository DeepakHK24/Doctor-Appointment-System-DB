const express = require("express");
const {
  addAvailability,
  getDoctorAvailability,
  getMyAvailability
} = require("../controllers/availabilityController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// DOCTOR → ADD AVAILABILITY
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("doctor"),
  addAvailability
);

// PUBLIC → VIEW DOCTOR AVAILABILITY
router.get("/doctor/:doctorId", getDoctorAvailability);

// DOCTOR → VIEW OWN AVAILABILITY
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("doctor"),
  getMyAvailability
);

module.exports = router;
