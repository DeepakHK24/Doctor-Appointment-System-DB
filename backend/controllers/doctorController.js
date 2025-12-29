const Doctor = require("../models/Doctor");

// APPLY AS DOCTOR
const applyDoctor = async (req, res) => {
  try {
    const { specialization, experience } = req.body;

    if (!specialization || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent duplicate applications
    const existingApplication = await Doctor.findOne({
      userId: req.user._id
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "Doctor application already submitted" });
    }

    const doctor = new Doctor({
      userId: req.user._id,
      specialization,
      experience
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor application submitted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { applyDoctor };
