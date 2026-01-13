const Availability = require("../models/Availability");

// ADD AVAILABILITY (Doctor)
const addAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const availability = await Availability.create({
      doctorId: req.user._id,
      date,
      startTime,
      endTime
    });

    res.status(201).json({
      message: "Availability added",
      availability
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET DOCTOR AVAILABILITY (Public)
const getDoctorAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const availability = await Availability.find({
      doctorId,
      isBooked: false
    });

    res.json(availability);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET MY AVAILABILITY (Doctor)
const getMyAvailability = async (req, res) => {
  try {
    const availability = await Availability.find({
      doctorId: req.user._id
    });

    res.json(availability);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addAvailability,
  getDoctorAvailability,
  getMyAvailability
};
