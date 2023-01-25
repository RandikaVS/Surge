const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const { green } = require("colors");
const genarateToken = require("../config/genarateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password } = req.body;

  if(!fname || !lname || !email || !password){
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }


  const userExist = await User.findOne({ email }); 

  if (userExist) {
    console.log("User already exist!!!".red.bold);
    res.status(400).json({
      error: "User already exist !!!",
    });
    throw new error("User already exist!!!");
  }

  const user = await User.create({
    fname,
    lname,
    email,
    password,
  });
  
  if (user) {
    console.log("Registered!!!".green.bold);
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      token: genarateToken(user._id),
    });
  } else {
    console.log("Failed to Register User !!!".red.bold);
    res.status(400).json({
      error: "Failed to Register User !!!",
    });
    throw new error("Failed to Register User !!!");
  }

});

const authUser = asyncHandler(async(req,res)=>{
  console.log("back end called".red.bold);

  const { email, password } = req.body;
  
  const user = await User.findOne({ email });

  if(!user){
    res.status(400).json({
      error: "This email not registered yet !!!",
    });
    throw new error("This email not registered yet !!!");
  }
     

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      pic: user.pic,
      token: genarateToken(user._id),
    });
  } else {
    console.log("Invalid email or Password".red.bold);
      res.status(400).json({
        error: "Incorrect password !!!",
      });
    throw new error("Incorrect password !!!");
  }

});

module.exports = {
  registerUser,
  authUser
};
