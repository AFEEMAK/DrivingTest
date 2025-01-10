const User = require("../models/User.js");
const bcrypt = require("bcrypt");

// show the login page
const loginController = (req, res) => {
  const showMsgError = false;
  res.render("login", { showMsgError });
};

// checking if the login details - username and password if existed in db.
const checkController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash("error", "Username or password can not be empty");
    return res.redirect("/login");
  }
  else {
    try {
      // Convert the entered username to lowercase
      const lowerUsername = username.toLowerCase();
  
      const user = await User.findOne({ username: lowerUsername });
  
      if (user) {
        const pswdCorrect = await bcrypt.compare(password, user.password);
  
        if (pswdCorrect) {
          if (user.user === "driver") {
            req.session.showAuthenticatedRoutes = true;
          } else {
            req.session.showAuthenticatedRoutes = false;
          }
  
          req.session.userId = user._id;
          req.session.usertype = user.usertype;
          req.session.fname = user.fname;
          req.session.currentUser = true; // currentUser session is enabled
          return res.redirect("/");
        } else {
          req.flash("error", "Password is incorrect!");
        }
      } else {
        req.flash("error", "User not found! Please register your account.");
      }
  
      return res.redirect("/login");
    } catch (error) {
      console.error(error);
      req.flash("error", "An unexpected error occurred.");
      return res.redirect("/login");
    }
  }
        

  
};

module.exports = { loginController, checkController };
