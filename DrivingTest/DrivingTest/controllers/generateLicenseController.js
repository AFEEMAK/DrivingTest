const User = require("../models/User.js");
module.exports = async(req,res) => {
const userToUpdate = req.body.userId;

var uniqueLicense = Math.floor(Math.random() * 10000) + 1;



const user = await User.findOne({_id: userToUpdate});
if (user.TestType == "G2"){
    uniqueLicense = "G2-"+uniqueLicense;
}
else if (user.TestType == "G"){
    uniqueLicense = "G-"+uniqueLicense;
}
const update = await User.findByIdAndUpdate(userToUpdate,{license_no : uniqueLicense})
res.redirect('candidatesStatus');

}