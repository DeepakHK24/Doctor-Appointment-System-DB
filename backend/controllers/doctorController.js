const Doctor = require("../models/Doctor");
const User = require("../models/User");

// PATIENT → APPLY AS DOCTOR
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

// ADMIN → VIEW ALL PENDING APPLICATIONS
const getAllDoctorApplications = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "pending" }).populate(
      "userId",
      "name email"
    );

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN → APPROVE / REJECT DOCTOR
const updateDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.status = status;
    await doctor.save();

    // If approved → update user role
    if (status === "approved") {
      await User.findByIdAndUpdate(doctor.userId, {
        role: "doctor"
      });
    }

    res.json({ message: "Doctor status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ EXPORTS (IMPORTANT)
module.exports = {
  applyDoctor,
  getAllDoctorApplications,
  updateDoctorStatus
};
