const User = require("../models/User.js");

const examinerController = async (req, res) => {
  const user = await User.find({ usertype: "driver" });

  var selectData = [];
  if (user) {
    user.forEach((element) => {
      if (element.appointmentId != "" && element.firstname != "default") {
        selectData.push(element);
      }
    });
  }

  res.render("examiner", { DriverData: selectData, TestType: "All" });
};

const candidatesListController = async (req, res) => {
  var TestType = req.body.TestType;

  const user = await User.find({ usertype: "driver" });

  if (user) {
    if (TestType === "G2" || TestType === "G") {
      var selectData = [];
      user.forEach((element) => {
        if (
          element.appointmentId != "" &&
          element.TestType === TestType &&
          element.firstname != "default"
        ) {
          selectData.push(element);
        }
      });
      res.render("examiner", { DriverData: selectData, TestType: TestType });
    } else {
      var allDrivers = [];
      user.forEach((element) => {
        if (element.appointmentId != "" && element.firstname != "default") {
          allDrivers.push(element);
        }
      });
      res.render("examiner", { DriverData: allDrivers, TestType: TestType });
    }
  }
};

const examinerReviewController = async (req, res) => {
  var driverId = req.body.driverId;

  const user = await User.findOne({ _id: driverId });

  res.render("examinerReview", { DriverData: user });
};

const updateReviewController = async (req, res) => {
  var status = req.body.status;
  var comment = req.body.comment.trim();
  var userId = req.body.userId;
  var updateStatus;

  if (status == "pass") {
    updateStatus = true;
  } else {
    updateStatus = false;
  }

  await User.findOneAndUpdate(
    { _id: userId },
    { examStatus: updateStatus, comment: comment }
  );

  const user = await User.find({ usertype: "driver" });
  var selectData = [];
  if (user) {
    user.forEach((element) => {
      if (element.appointmentId != "" && element.firstname != "default") {
        selectData.push(element);
      }
    });
  }

  res.render("examiner", { DriverData: selectData, TestType: "All" });
};

module.exports = {
  examinerController,
  candidatesListController,
  examinerReviewController,
  updateReviewController,
};
