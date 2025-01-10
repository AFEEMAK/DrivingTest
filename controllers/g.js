const User = require("../models/User.js");
const Appointment = require("../models/UserAppointment.js")
const renderGController = async (req, res) => {
  var data = await User.findOne({ _id: currentUser });
  console.log(data);
  if (data) {

    // If the firstname is already updated
    if (data.license_no && data.license_no.startsWith('G2')) {
      console.log(data);
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
      
      var dateSelected = (req.body.date ? req.body.date : today);
      var alreadybookeddate = await Appointment.find({
        date: dateSelected,
        isTimeSlotAvailable: true,
      });
      var resDate = [];
    
      alreadybookeddate.forEach((element) => {
        resDate.push(element.time);
      });
      if (data.appointmentId && data.TestType=="G"){
        var current_appt = await Appointment.findOne({ _id: data.appointmentId.toString()});
        console.log(current_appt);
        dateSelected = current_appt.date;
        resDate = current_appt.time
      }
      res.render("g", { user: data , dateSelected, displayTime : resDate});
    }else{
      data = null;
      res.render("g", { user: data });
    }
    // Page is redirected to g2, if the firstname is not updated

  }
};

const bookGDateController = async(req, res) => {
  var data = await User.findOne({ _id: currentUser });
  const dateSelected = req.body.date
  const availableAppointments = await Appointment.find({
    date: dateSelected,
    isTimeSlotAvailable: true,
  });

  var availableTimeSlots = [];
  availableAppointments.forEach((element) => {
    availableTimeSlots.push(element.time);
  });
  var alreadybookeddate = await Appointment.find({
    date: dateSelected,
    isTimeSlotAvailable: true,
  });

  if(alreadybookeddate){

  
  var resDate = [];

  alreadybookeddate.forEach((element) => {
    resDate.push(element.time);
  });
  
  res.render("g",{user: data, dateSelected,availableTimeSlots, displayTime : resDate});
  }

};

module.exports = { renderGController, bookGDateController };