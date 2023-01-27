const asyncHandler = require("express-async-handler");
const Post = require("../models/postModal");
const User = require("../models/userModal");

const addPost = asyncHandler(async (req, res) => {
  const { userId, image, userPic, userName, caption, timeCreated } =
    req.body;

  if (!userId || !userName || !image || !userPic) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  const user = await User.findById({ _id:userId });
  var count = ++user.postsCount;
  // count = ++count


  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      postsCount: count,
    },
    {
      new: true,
    }
  );

  const post = await Post.create({
    userId,
    userName,
    image,
    userPic,
    caption,
    timeCreated,
  });

  if (!updateUser) {
    console.log("Failed increment post count !!!".red.bold);
    res.status(400).json({
      error: "Failed to increment post count for user !!!",
    });
    throw new error("Failed to increment post count for user !!!");
  }

  if (post && updateUser) {
    console.log("Posted!!!".green.bold);
    res.status(201).json({
      _id: post._id,
      userId: post.userId,
      userName: post.userName,
      image: post.image,
      userPic: post.userPic,
      caption: post.caption,
      likes: post.likes,
      timeCreated: post.timeCreated,
      postCount: updateUser.postsCount,
    });
  } else {
    console.log("Failed add post !!!".red.bold);
    res.status(400).json({
      error: "Failed to add post !!!",
    });
    throw new error("Failed to add post !!!");
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ timeCreated: -1, likes: -1 });;

  if (posts) {
    console.log("Posts fetched!!!".green.bold);
    res.status(201).json({
      postList: posts,
    });
    // console.log(posts);
  } else {
    console.log("Failed add post !!!".red.bold);
    res.status(400).json({
      error: "Failed to fetch post !!!",
    });
    throw new error("Failed to fetch post !!!");
  }
});

const addLike = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  var { likes } = req.body;

  const addlikes = await Post.findByIdAndUpdate(
    postId,
    {
      likes: likes,
    },
    {
      new: true,
    }
  );

  if (addlikes) {
    res.status(201).json({
      status: "like added",
      likes: addlikes.likes,
    });

    console.log(addLike);
  } else {
    res.status(400).json({
      error: "Fail to add like",
      likes: likes,
    });
    throw new error("Fail to add like !!!").red.bold;
  }
});

module.exports = {
  addPost,
  getAllPosts,
  addLike,
};
