const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");
const Notification = require("../models/Notification");

// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, availabilityId } = req.body;

    const slot = await Availability.findById(availabilityId);
    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: "Slot not available" });
    }

    const appointment = new Appointment({
      patientId: req.user._id,
      doctorId,
      availabilityId,
      status: "pending"
    });

    await appointment.save();

    slot.isBooked = true;
    await slot.save();

    await Notification.create({
      userId: doctorId,
      message: "New appointment booked"
    });

    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PATIENT APPOINTMENTS
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user._id
    }).populate("doctorId availabilityId");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DOCTOR APPOINTMENTS
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.user._id
    }).populate("patientId availabilityId");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE STATUS
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    await Notification.create({
      userId: appointment.patientId,
      message: `Your appointment was ${status}`
    });

    res.json({ message: "Status updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    const slot = await Availability.findById(appointment.availabilityId);
    if (slot) {
      slot.isBooked = false;
      await slot.save();
    }

    await Notification.create({
      userId: appointment.doctorId,
      message: "Appointment cancelled"
    });

    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// RESCHEDULE APPOINTMENT
const rescheduleAppointment = async (req, res) => {
  try {
    const { appointmentId, newAvailabilityId } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const newSlot = await Availability.findById(newAvailabilityId);
    if (!newSlot || newSlot.isBooked) {
      return res.status(400).json({ message: "New slot unavailable" });
    }

    const oldSlot = await Availability.findById(appointment.availabilityId);
    if (oldSlot) {
      oldSlot.isBooked = false;
      await oldSlot.save();
    }

    newSlot.isBooked = true;
    await newSlot.save();

    appointment.availabilityId = newAvailabilityId;
    appointment.status = "pending";
    await appointment.save();

    await Notification.create({
      userId: appointment.doctorId,
      message: "Appointment rescheduled"
    });

    res.json({ message: "Appointment rescheduled", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  rescheduleAppointment
};
