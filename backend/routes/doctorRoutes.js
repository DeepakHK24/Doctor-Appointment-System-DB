const express = require("express");
const { applyDoctor } = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Patient applies as doctor
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("patient"),
  applyDoctor
);

module.exports = router;
