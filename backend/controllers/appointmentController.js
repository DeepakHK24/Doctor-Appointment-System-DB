const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");

/**
 * PATIENT → BOOK APPOINTMENT
 */
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, availabilityId } = req.body;

    if (!doctorId || !availabilityId) {
      return res.status(400).json({ message: "Doctor and slot are required" });
    }

    const slot = await Availability.findById(availabilityId);

    if (!slot) {
      return res.status(404).json({ message: "Availability slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
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

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATIENT → VIEW OWN APPOINTMENTS
 */
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user._id
    })
      .populate("doctorId", "name email")
      .populate("availabilityId");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DOCTOR → VIEW OWN APPOINTMENTS
 */
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.user._id
    })
      .populate("patientId", "name email")
      .populate("availabilityId");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DOCTOR → UPDATE APPOINTMENT STATUS
 */
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    const allowedStatus = ["approved", "completed", "cancelled"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.doctorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    appointment.status = status;
    await appointment.save();

    // Free slot if cancelled
    if (status === "cancelled") {
      const slot = await Availability.findById(appointment.availabilityId);
      if (slot) {
        slot.isBooked = false;
        await slot.save();
      }
    }

    res.json({ message: "Appointment status updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATIENT or DOCTOR → CANCEL APPOINTMENT
 */
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const userId = req.user._id.toString();

    if (
      appointment.patientId.toString() !== userId &&
      appointment.doctorId.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not authorized to cancel" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    const slot = await Availability.findById(appointment.availabilityId);
    if (slot) {
      slot.isBooked = false;
      await slot.save();
    }

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment
};
