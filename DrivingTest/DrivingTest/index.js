const express = require("express");
const path = require("path");
const ejs = require("ejs");
const app = new express();
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");

// DB connection
mongoose
  .connect(
    "Your Connection String",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected Successfully to MongoDB");
  })
  .catch((err) => {
    console.error("Connection Error to MongoDb:", err);
  });
const User = require("./models/User");

// Controllers
const { 
  loginController, 
  checkController 
} = require("./controllers/login.js");
const {
  registerController,
  registerInfoController,
} = require("./controllers/register.js");

const { 
  appoinmentController,
  addSlotController, 
  candidatesStatusController, 
} = require("./controllers/appointment");

const g2Controller = require("./controllers/g2.js");
const g2UpdationController = require("./controllers/g2updation.js");
const checkAppointmentController = require("./controllers/checkAppointment");
const bookingController = require("./controllers/booking.js");
const {renderGController,bookGDateController} = require("./controllers/g.js");
const gUpdationController = require("./controllers/gUpdation.js");
const signoutController = require("./controllers/signout.js");
const storeG2UserDetail = require("./controllers/storeG2UserDetail.js")
const generateLicenseController = require("./controllers/generateLicenseController.js")

const {
  examinerController,
  candidatesListController,
  examinerReviewController,
  updateReviewController,
} = require("./controllers/examiner.js");

const testResultController = require("./controllers/testResult.js");



const preventLoginAccessMiddleware = require("./middlewares/preventLoginAccess.js");
const authMiddleware = require("./middlewares/authMiddleware.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "FinalProjectGroup7",
  })
);

global.showAuthenticatedRoutes = false;
global.currentUser = null;
global.utype = null;
global.fname = null;

// routes to handle
app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.use("*", (req, res, next) => {
  currentUser = req.session.userId;
  utype = req.session.usertype;
  fname = req.session.firstname;
  next();
});

app.get("/", authMiddleware, async (req, res) => {
  const users = await User.find({});
  // console.log(users);
  res.render("index", { users, currentUser: req.session.currentUser });
});

// Login Page
app.get("/login", preventLoginAccessMiddleware, loginController); // Login page
app.post("/login", preventLoginAccessMiddleware, checkController); // checking login credentials

// Registration Page
app.get("/register", preventLoginAccessMiddleware, registerController); // Register page
app.post("/registerAccount", preventLoginAccessMiddleware, registerInfoController); //checking signup details

// Logout route
app.get("/signout",authMiddleware, signoutController); // Signout the currentuser account

// Admin Dashboard
app.get("/appointment",authMiddleware, appoinmentController); // Admin - Appointment Page
app.post("/createSlot",authMiddleware, addSlotController); // to create an appointment slot
app.get("/candidatesStatus",authMiddleware, candidatesStatusController); // all candidates list with their results
app.post("/generateLicense",authMiddleware, generateLicenseController); // all candidates list with their results

// Driver's Dashboard
app.get("/g2",authMiddleware, g2Controller); // Driver - G2 Page
app.post("/saveUserDetails",authMiddleware, g2UpdationController); // Save the user details from g2 page
app.post("/saveNewUserDetails",authMiddleware, storeG2UserDetail)
app.post("/checkAppointment",authMiddleware, checkAppointmentController);
app.post("/appointmentBooking",authMiddleware, bookingController);

app.post("/checkAppointmentG",authMiddleware, bookGDateController);
app.get("/g",authMiddleware, renderGController); // Driver - G Page
app.post("/updateCarDetails",authMiddleware, gUpdationController); // Update the car details from G Page
app.get("/testResult",authMiddleware, testResultController); // Driver's test result

// Examiner Dashboard
app.get("/examiner",authMiddleware, examinerController); // Examiner Page
app.post("/candidatesList",authMiddleware, candidatesListController); // Examiner to filter G2, G and All candidates
app.post("/examinerReview",authMiddleware, examinerReviewController); // Examiner will be able to review each candidates
app.post("/updateTestResult", authMiddleware,updateReviewController); // Examiner updates the result of a candidate
