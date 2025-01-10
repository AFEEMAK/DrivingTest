const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Appointment Schema
const AppointmentSchema = new Schema({
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  isTimeSlotAvailable: {
    type: Boolean,
    default: true,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
