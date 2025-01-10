const Appointment = require("../models/UserAppointment.js");
const User = require("../models/User.js");

module.exports = async (req, res) => {
  var date = req.body.date;
  var time = req.body.time;

  var today = new Date();
  var day = today.getDate() + 1;
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  today = year + "-" + month + "-" + day;
  var dateSelected = today;

  var userId = req.session.userId;
  const g2UserDetails = await User.findOne({ _id: userId });

  var availableAppointments = await Appointment.findOne({
    date: date,
    time: time,
    isTimeSlotAvailable: true,
  });

  var availableTimeSlots = [];
  if (availableAppointments) {
    availableTimeSlots.push(availableAppointments.time);
  }

  

  if (!time) {
    const err = "This date is not available. Please select next available date";
    res.render("g2", {
      gData: g2UserDetails,
      Cdata: g2UserDetails.car_details,
      dateSelected: dateSelected,
      displayTime: availableTimeSlots,
      showMessage: err,
    });
  } else if (!g2UserDetails) {
    g2UserDetails = {
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
    const err = "";
    res.render("g2", {
      gData: g2UserDetails,
      Cdata: car_details,
      dateSelected: dateSelected,
      displayTime: availableTimeSlots,
      showMessage: err,
    });
  } else {
    const err = `Appointment has been confirmed. See you on "${dateSelected}" at "${availableTimeSlots}".`;
    await Appointment.findOneAndUpdate(
      { _id: availableAppointments._id },
      { isTimeSlotAvailable: false }
    );
    if (g2UserDetails.license_no && g2UserDetails.license_no.startsWith('G2')) {
      await User.findOneAndUpdate(
        { _id: userId },
        { appointmentId: availableAppointments._id ,
         TestType: "G"}
          
      );
      res.redirect("/");
    }
    await User.findOneAndUpdate(
      { _id: userId },
      { appointmentId: availableAppointments._id }
    );

    
    res.render("g2", {
      gData: g2UserDetails,
      Cdata: g2UserDetails.car_details,
      dateSelected: dateSelected,
      displayTime: availableTimeSlots,
      showMessage: err,
    });
  }
};
