const User = require("../models/User.js");
const Appointment = require("../models/UserAppointment");

module.exports = async (req, res) => {
  var user_id = req.session.userId;
  console.log(user_id);

  // Fetch user data
  const G2data = await User.findOne({ _id: user_id });
  
  // Initialize current_appt as null
  let current_appt = null;

  // Fetch current appointment if it exists
  if (G2data && G2data.appointmentId) {
    current_appt = await Appointment.findOne({ _id: G2data.appointmentId.toString() });
  }

  // Date calculations
  var today = new Date();
  var day = today.getDate() + 1;
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  today = `${year}-${month}-${day}`;
  var dateSelected = today;

  // Fetch available time slots
  const alreadybookeddate = await Appointment.find({
    date: dateSelected,
    isTimeSlotAvailable: true,
  });
  
  var resDate = [];
  alreadybookeddate.forEach((element) => {
    resDate.push(element.time);
  });

  const err = [""];

  // Render based on user data
  if (G2data && G2data.firstname === "default") {
    const G2dataDefault = {
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
      gData: G2dataDefault,
      Cdata: car_details,
      current_appt,
      dateSelected,
      displayTime: resDate,
      showMessage: err,
    });
  } else {
    res.render("g2", {
      gData: G2data,
      current_appt,
      Cdata: G2data.car_details,
      dateSelected,
      displayTime: resDate,
      showMessage: err,
    });
  }
};
