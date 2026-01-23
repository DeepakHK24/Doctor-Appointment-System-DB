const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Notification = require("../models/Notification");

// ================= PATIENT DASHBOARD =================
const patientDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalAppointments = await Appointment.countDocuments({
      patientId: userId
    });

    const upcomingAppointments = await Appointment.countDocuments({
      patientId: userId,
      status: "approved"
    });

    const completedAppointments = await Appointment.countDocuments({
      patientId: userId,
      status: "completed"
    });

    const cancelledAppointments = await Appointment.countDocuments({
      patientId: userId,
      status: "cancelled"
    });

    const unreadNotifications = await Notification.countDocuments({
      userId,
      isRead: false
    });

    res.json({
      totalAppointments,
      upcomingAppointments,
      completedAppointments,
      cancelledAppointments,
      unreadNotifications
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DOCTOR DASHBOARD =================
const doctorDashboard = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const totalAppointments = await Appointment.countDocuments({
      doctorId
    });

    const pendingAppointments = await Appointment.countDocuments({
      doctorId,
      status: "pending"
    });

    const approvedAppointments = await Appointment.countDocuments({
      doctorId,
      status: "approved"
    });

    const today = new Date().toISOString().split("T")[0];

    const todaysAppointments = await Appointment.countDocuments({
      doctorId,
      appointmentDate: today
    });

    const unreadNotifications = await Notification.countDocuments({
      userId: doctorId,
      isRead: false
    });

    res.json({
      totalAppointments,
      pendingAppointments,
      approvedAppointments,
      todaysAppointments,
      unreadNotifications
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= ADMIN DASHBOARD =================
const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await Doctor.countDocuments({ status: "approved" });
    const pendingDoctors = await Doctor.countDocuments({ status: "pending" });
    const totalAppointments = await Appointment.countDocuments();

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

module.exports = {
  patientDashboard,
  doctorDashboard,
  adminDashboard
};
