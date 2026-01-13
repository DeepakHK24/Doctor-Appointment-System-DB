const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Notification = require("../models/Notification");

// GET ADMIN DASHBOARD STATS
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await Doctor.countDocuments({ status: "approved" });
    const pendingDoctors = await Doctor.countDocuments({ status: "pending" });
    const totalAppointments = await require("../models/Appointment").countDocuments();

    res.json({
      totalUsers,
      totalDoctors,
      pendingDoctors,
      totalAppointments
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET DOCTOR APPLICATIONS
const getDoctorApplications = async (req, res) => {
  try {
    const applications = await Doctor.find({ status: "pending" }).populate(
      "userId",
      "name email"
    );

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// APPROVE / REJECT DOCTOR
const updateDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.status = status;
    await doctor.save();

    const user = await User.findById(doctor.userId);
    user.role = status === "approved" ? "doctor" : "patient";
    await user.save();

    await Notification.create({
      userId: doctor.userId,
      message: `Your doctor application was ${status}`
    });

    res.json({ message: `Doctor ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAdminStats,
  getDoctorApplications,
  updateDoctorStatus
};
