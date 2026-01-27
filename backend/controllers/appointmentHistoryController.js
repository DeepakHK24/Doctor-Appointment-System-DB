const Appointment = require("../models/Appointment");

// ================= PATIENT HISTORY =================
const patientAppointmentHistory = async (req, res) => {
  try {
    const { status, fromDate, toDate } = req.query;

    let query = { patientId: req.user._id };

    if (status) query.status = status;

    if (fromDate && toDate) {
      query.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const appointments = await Appointment.find(query)
      .populate("doctorId", "name email")
      .populate("availabilityId")
      .sort({ createdAt: -1 });

    res.json({
      total: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DOCTOR HISTORY =================
const doctorAppointmentHistory = async (req, res) => {
  try {
    const { status, fromDate, toDate } = req.query;

    let query = { doctorId: req.user._id };

    if (status) query.status = status;

    if (fromDate && toDate) {
      query.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const appointments = await Appointment.find(query)
      .populate("patientId", "name email")
      .populate("availabilityId")
      .sort({ createdAt: -1 });

    res.json({
      total: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= ANALYTICS =================
const appointmentAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    let baseQuery =
      role === "doctor"
        ? { doctorId: userId }
        : { patientId: userId };

    const total = await Appointment.countDocuments(baseQuery);
    const completed = await Appointment.countDocuments({
      ...baseQuery,
      status: "completed"
    });
    const cancelled = await Appointment.countDocuments({
      ...baseQuery,
      status: "cancelled"
    });
    const upcoming = await Appointment.countDocuments({
      ...baseQuery,
      status: "approved"
    });

    res.json({
      total,
      completed,
      cancelled,
      upcoming
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  patientAppointmentHistory,
  doctorAppointmentHistory,
  appointmentAnalytics
};
