const Appointment = require("../models/UserAppointment");
const User = require("../models/User.js");

module.exports = async (req, res) => {
  var userId = req.session.userId;
  const g2UserDetails = await User.findOne({ _id: userId });
  
  // getting all time slots available for the selected day
  var dateSelected = req.body.date;
  const availableAppointments = await Appointment.find({
    date: dateSelected,
    isTimeSlotAvailable: true,
  });
  var availableTimeSlots = [];
  availableAppointments.forEach((element) => {
    availableTimeSlots.push(element.time);
  });

  
  if (!g2UserDetails) {
    const g2UserDetails = {
      firstName: "",
      lastName: "",
      licenseNumber: "",
      age: "",
      dob: "",
    };
    const car_details = {
      Brand: "",
      modelNumber: "",
      year: "",
      plateNumber: "",
    };
    res.render("g2", {
      gData: g2UserDetails,
      Cdata: car_details,
      dateSelected: dateSelected,
      displayTime: availableTimeSlots,
      showMessage: "",
    });
  } else {
    res.render("g2", {
      gData: g2UserDetails,
      Cdata: g2UserDetails.car_details,
      dateSelected: dateSelected,
      displayTime: availableTimeSlots,
      showMessage: "",
    });
  }
};
 