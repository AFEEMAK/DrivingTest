const User = require("../models/User.js");

// Showing the signin page
const registerController = (req, res) => {
  const showMsgError = req.flash("error");
  const enteredUsername = req.flash("username")[0]; // Retrieve the username from flash
  res.render("register", { showMsgError, enteredUsername });
};


// checking the user input fields to register the account
const registerInfoController = async (req, res) => {
  try {
    const { username, password, repassword, usertype } = req.body;

    

    // Convert the username to lowercase
    const lowerUsername = username.toLowerCase();

    // If the user already exists in the database
    if (await User.findOne({ username: lowerUsername })) {
      req.flash("error", "User Already Exists.");
      req.flash("username", username); // Save the entered username in flash
      return res.redirect("/register");
    }
    if (!username || !password || !repassword || !usertype) {
      req.flash("error", "Please fill in all the fields.");
      req.flash("username", username); // Save the entered username in flash
      return res.redirect("/register");
    }
    // If the password and repassword fields do not match
    else if (password !== repassword) {
      req.flash("error", "Passwords are not matching. Please re-enter the password.");
      req.flash("username", username); // Save the entered username in flash
      return res.redirect("/register");
    } else {
      // Storing the new user details to User table
      const signindetails = {
        username: lowerUsername,
        password: password,
        usertype: usertype,
        TestType: "All",
      };
      await User.create(signindetails);
      req.flash("success", "Account registered successfully. You can now log in.");
      return res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    req.flash("error", "An unexpected error occurred.");
    req.flash("username", username); // Save the entered username in flash
    return res.redirect("/register");
  }
};


module.exports = { registerController, registerInfoController };
