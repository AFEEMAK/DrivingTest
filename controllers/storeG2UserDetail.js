const User = require("../models/User.js");

module.exports = async (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.age || !req.body.make || !req.body.model || !req.body.year || !req.body.platno) {
        console.log(req.body.firstname + "on save userdetail page");
        req.flash('error', 'All fields are required.');
        return res.redirect('g2'); 
      }
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
        firstname: req.body.firstname.trim(),
        lastname: req.body.lastname.trim(),
        age: req.body.age.trim(),
        TestType: "G2",
        car_details: {make: make,
        model: model,
        year: year,
        platno: platno}
        }
    );

    if(updatedUser){
      res.render("/g2");
    }
    // req.session.fname = updatedUser.firstname;
  } catch (error) {
    console.error(error);
    res.redirect("g2"); // Redirect to g2 page if an error occurs
  }
};
     