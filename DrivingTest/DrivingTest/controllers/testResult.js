const User = require("../models/User.js");

module.exports = async (req, res) => {
    const user = await User.findOne({ _id: currentUser });
    res.render("testResult", { DriverData: user });
  };