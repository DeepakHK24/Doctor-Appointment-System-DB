const Availability = require("../models/Availability");

// DOCTOR → ADD AVAILABILITY
const addAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const slot = new Availability({
      doctorId: req.user._id,
      date,
      startTime,
      endTime
    });

    await slot.save();

    res.status(201).json({
      message: "Availability added successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DOCTOR → VIEW OWN AVAILABILITY
const getDoctorAvailability = async (req, res) => {
  try {
    const slots = await Availability.find({
      doctorId: req.user._id
    });

    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PATIENT → VIEW DOCTOR AVAILABILITY
const getAvailabilityByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const slots = await Availability.find({
      doctorId,
      isBooked: false
    });

    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addAvailability,
  getDoctorAvailability,
  getAvailabilityByDoctor
};
