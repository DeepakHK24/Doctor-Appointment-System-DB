const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

// ADMIN → DASHBOARD STATS
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const pendingDoctors = await Doctor.countDocuments({ status: "pending" });
    const totalAppointments = await Appointment.countDocuments();

    const appointmentStats = await Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalUsers,
      totalDoctors,
      pendingDoctors,
      totalAppointments,
      appointmentStats
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminStats };
