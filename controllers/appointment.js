// Render the Appointment Page
const User = require("../models/User.js");
const Appointment = require("../models/UserAppointment");

// appoinmentController
const appoinmentController = async (req, res) => {
  var displayTime = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
  ];

  const message = "";
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

  res.render("appointment", {
    dateSelected: dateSelected,
    displayTime: displayTime,
    showMessage: message,
  });
};
  


// addSlotController
// this function checks if slot is stored in db. if not, return true
async function slotAvailable(date, time) {
  const available = await Appointment.findOne({
    date: date,
    time: time,
  });
  return !available;
}

// this function render the appointment page
async function showAppointmentPage(res, dateSelected, displayTime, showMsg) {
  res.render("appointment", {
    dateSelected: dateSelected,
    displayTime: displayTime,
    showMessage: showMsg,
  });
}

const addSlotController = async (req, res) => {
  var date = req.body.date;
  var time = req.body.time;

  var displayTime = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
  ];

  var today = new Date();
  var day = today.getDate() + 1;
  var month = today.getMonth() + 1; // Adding as Jan is '0'
  var year = today.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  today = year + "-" + month + "-" + day;
  var dateSelected = today;

  
  if (time = 0) {
    await Appointment.create(req.body);
    const showMsg = `Please select a date to book`;
    res.render("appointment", {
      showMessage: showMsg,
    });
  } else {
    const isSlotAvailable = await slotAvailable(date, time);
    if (isSlotAvailable) {
      // If slot is available, save the new appointment to db
      await Appointment.create(req.body);
      const showMsg = `"${date}" - "${time}" is now available for users for booking`;
      await showAppointmentPage(res, dateSelected, displayTime, showMsg);
    } else {
      // Appointment slot is not available
      const showMsg = `"${date}" - "${time}" is already available for users. Please select another time or date.`;
      await showAppointmentPage(res, dateSelected, displayTime, showMsg);
    }
  }
};



// candidatesStatusController
const candidatesStatusController = async (req, res) => {
    const user = await User.find({ usertype: "driver" });
    var selectData = [];
    if (user) {
      user.forEach((element) => {
        if (element.appointmentId != "") {
          selectData.push(element);
        }
      });
    }
  
    res.render("candidatesStatus", { DriverData: selectData });
  };


  
module.exports = {
  appoinmentController,
  addSlotController, 
  candidatesStatusController, 
};
