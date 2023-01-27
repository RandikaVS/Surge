const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const { green } = require("colors");
const genarateToken = require("../config/genarateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, userName, password } = req.body;

  if (!fname || !lname || !email || !userName || !password) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  const userExist = await User.findOne({ email });
  const userNameExist = await User.findOne({ userName });

  if (userExist) {
    console.log("User already exist!!!".red.bold);
    res.status(400).json({
      error: "User already exist !!!",
    });
    throw new error("User already exist!!!");
  }
  if (userNameExist) {
    console.log("User name already exist!!!".red.bold);
    res.status(400).json({
      error: "User name already exist !!!",
    });
    throw new error("User name already exist!!!");
  }

  const user = await User.create({
    fname,
    lname,
    email,
    userName,
    password,
  });

  if (user) {
    console.log("Registered!!!".green.bold);
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      userName: user.userName,
      followers: user.followers,
      following: user.following,
      postCount: user.postCount,
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

const authUser = asyncHandler(async (req, res) => {
  console.log("back end called".red.bold);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
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
      followers:user.followers,
      following:user.following,
      postsCount:user.postsCount,
      pic: user.pic,
      about: user.about,
      userName:user.userName,
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

const getSingleUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  console.log(_id, "user id");
  const user = await User.findOne({ _id: _id });

  if (user) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      userName: user.userName,
      password: user.password,
      followers: user.followers,
      following: user.following,
      postsCount: user.postsCount,
      about: user.about,
      pic: user.pic,
    });
    console.log(user);
  } else {
    console.log("Error fetching user".red.bold);
    res.status(401).json({
      error: "cannot find user",
    });
    throw new error("Error fetching user");
  }
});

const updateUser = asyncHandler(async (req, res) => {

  const { fname, lname, email, _id, pic, about } = req.body;

  if (!fname || !lname || !email || !_id) {
    res.send(400).json({
      error: "Please enter all the fields!!!",
    });
    throw new error("Please enter all the fields!!!");
  }

  
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        fname: fname,
        lname: lname,
        email: email,
        pic: pic,
        about: about,
      },
      {
        new: true,
      }
    );

    if (updateUser) {
      console.log("Updated!!!".green.bold);
      res.status(201).json({
        _id: updateUser._id,
        fname: updateUser.fname,
        lname: updateUser.lname,
        email: updateUser.email,
        userName: updateUser.userName,
        followers: updateUser.followers,
        following: updateUser.following,
        postsCount: updateUser.postsCount,
        pic: updateUser.pic,
        about: updateUser.about,
      });

      console.log(updateUser);
    } else {
      res.status(400).json({
        error: "Update Failed",
      });
      throw new error("User not updated !!!");
    }
});

const deleteUser = asyncHandler(async(req,res)=>{

  const{_id} = req.body;

  if(!_id){
    console.log("Id is null".red.bold);
    res.status(400).json({
      error: "User id is null",
    });
    throw new error("Error while deleting shop !!!");
  }
  else{
    try {
      const user = await User.findOneAndDelete({ _id: _id });

      if (user) {
        res.status(201).json({
          _id: _id,
        });
        console.log("Account deleted".red.bold);
      }
    } catch (error) {
      res.status(400).json({
        error:"Fail to delete account !!!"
      });
      throw new error("Error while deleting shop !!!" + error.message);
    }
  }
})

module.exports = {
  registerUser,
  authUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
