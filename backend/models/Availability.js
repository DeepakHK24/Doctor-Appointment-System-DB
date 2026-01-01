const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true
    },
    startTime: {
      type: String, // HH:mm
      required: true
    },
    endTime: {
      type: String, // HH:mm
      required: true
    },
    isBooked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", availabilitySchema);
