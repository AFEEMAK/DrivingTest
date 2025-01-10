const User = require("../models/User.js");
const Appointment = require("../models/UserAppointment");

module.exports = async (req, res) => {
  var user_id = req.session.userId;
  const G2data = await User.findOne({ _id: user_id });
  console.log(G2data.appointmentId.toString());
  if (G2data.appointmentId){
    var current_appt = await Appointment.findOne({ _id: G2data.appointmentId.toString()});
  } 

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
  var alreadybookeddate = await Appointment.find({
    date: dateSelected,
    isTimeSlotAvailable: true,
  });
  var resDate = [];

  alreadybookeddate.forEach((element) => {
    resDate.push(element.time);
  });

  const err = [""];

  if (G2data.firstname == "default") {
    const G2data = {
      firstName: "",
      lastName: "",
      licenseNumber: "",
      age: "",
      dob: "",
    };
    console.log("this ubasbkubfjksabfasjkbfajksfbasjbfhasbfasfjasbfjab"+G2data.firstName);
    const car_details = {
      Brand: "",
      modelNumber: "",
      year: "",
      plateNumber: "",
    };
    current_appt = null;
    res.render("g2", {
      gData: G2data,
      Cdata: car_details,
      current_appt,
      dateSelected: dateSelected,
      displayTime: resDate,
      showMessage: err,

      
    });
  } else {

    
    // console.log(current_appt[0]['date']);
    // console.log(current_appt.date);

    res.render("g2", {
      gData: G2data,
      current_appt,
      Cdata: G2data.car_details,
      dateSelected: dateSelected,
      displayTime: resDate,
      showMessage: err,
    });
  }
};
