const User = require("../models/User.js");

module.exports = async (req, res) => {
  try {
    const licenseno = req.body.license_no;
    const makedet = req.body["car_details.make"];
    const model = req.body["car_details.model"];
    const year = req.body["car_details.year"];
    const plate = req.body["car_details.platno"];

    const updatedUser = await User.findOneAndUpdate(
      { license_no: licenseno },
      {
        "car_details.make": makedet,
        "car_details.model": model,
        "car_details.year": year,
        "car_details.platno": plate,
        TestType: "G",
      },
      { new: true }
    );

    if (updatedUser) {
      console.log("User details updated successfully:", updatedUser);
      res.redirect("/g");
    } else {
      console.log("User not found or details not updated.");
      res.redirect("/g2");
    }
  } catch (error) {
    console.error("Error updating user details:", error);
    res.redirect("/g2");
  }
};
