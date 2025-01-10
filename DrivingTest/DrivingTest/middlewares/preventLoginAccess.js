module.exports =  (req, res, next) => {
    if (req.session.currentUser) {
      // If the user is already logged in, redirect to the home page or another appropriate page
      return res.redirect("/");
    }
    // If the user is not logged in, proceed to the next middleware or route handler
    next();
  };