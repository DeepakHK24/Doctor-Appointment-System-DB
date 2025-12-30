const express = require("express");
const {
  addAvailability,
  getDoctorAvailability,
  getAvailabilityByDoctor
} = require("../controllers/availabilityController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Doctor adds availability
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("doctor"),
  addAvailability
);

// Doctor views own slots
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorAvailability
);

// Patient views doctor slots
router.get(
  "/doctor/:doctorId",
  authMiddleware,
  roleMiddleware("patient"),
  getAvailabilityByDoctor
);

module.exports = router;
