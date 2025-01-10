const User = require("../models/User.js");

module.exports = async (req, res) => {
  try {

    console.log(req.body);

    const id = req.session.userId.trim();

    const make = req.body.make.trim();
    const model = req.body.model.trim();
    const year = req.body.year.trim();
    const platno = req.body.platno.trim();

    const updatedUser = await User.findByIdAndUpdate(
       id,
      {
        car_details: {make: make,
        model: model,
        year: year,
        platno: platno,
        TestType: "G2"}
        }
    );

    if(updatedUser){
      log
      res.redirect("/g");
    }
    // req.session.fname = updatedUser.firstname;
  } catch (error) {
    console.error(error);
    res.redirect("/g2"); // Redirect to g2 page if an error occurs
  }
};
     