const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// User Schema
const UserSchema = new Schema({
  firstname: { type: String, default: "default" },
  lastname: { type: String, default: "default" },
  license_no: { type: String},
  age: { type: Number, default: 0 },
  username: { type: String, default: "demo" },
  password: { type: String, default: "demo" },
  usertype: { type: String, default: "driver" },
  car_details: {
    make: { type: String, default: "default" },
    model: { type: String, default: "default" },
    year: { type: Number, default: 0 },
    platno: { type: String, default: "default" },
  },
  appointmentId: { type: String, default: "" },
  createdDate: { type: Date, default: new Date() },
  TestType: { type: String, default: "" },
  examStatus: { type: Boolean, default: false },
  comment: { type: String, default: "" },
});

// license number is encrypted before storing into db
UserSchema.pre("save", function (next) {
  const userDetails = this;
  bcrypt.hash(userDetails.license_no, 10, (error, hash) => {
    userDetails.license_no = hash;
    next();
  });
});

// password is encrypted before storing into db
UserSchema.pre("save", function (next) {
  const userDetails = this;
  bcrypt.hash(userDetails.password, 10, (err, hashPassword) => {
    userDetails.password = hashPassword;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
