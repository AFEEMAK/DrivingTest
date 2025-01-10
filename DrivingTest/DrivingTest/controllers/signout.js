// Logout the current user from the session.

module.exports = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      console.log("User signed out successfully.");
      res.redirect("/");
    }
  });
};
