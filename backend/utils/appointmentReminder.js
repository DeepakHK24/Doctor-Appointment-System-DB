const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const Notification = require("../models/Notification");

const startAppointmentReminder = () => {
  // Runs every hour
  cron.schedule("0 * * * *", async () => {
    try {
      const now = new Date();
      const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const appointments = await Appointment.find({
        appointmentDate: { $gte: now, $lte: next24Hours },
        reminderSent: false
      });

      for (const appointment of appointments) {
        // Notify patient
        await Notification.create({
          userId: appointment.patientId,
          message: "Reminder: You have an appointment scheduled within 24 hours"
        });

        // Notify doctor
        await Notification.create({
          userId: appointment.doctorId,
          message: "Reminder: You have an upcoming appointment within 24 hours"
        });

        appointment.reminderSent = true;
        await appointment.save();
      }

      console.log(`⏰ Appointment reminders checked: ${appointments.length}`);
    } catch (error) {
      console.error("Reminder job error:", error.message);
    }
  });
};

module.exports = startAppointmentReminder;
