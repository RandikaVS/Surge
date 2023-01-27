const express = require("express");
const router = express.Router();
const {
  addPost,
  getAllPosts,
  addLike,
} = require("../controllers/postControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addPost);
router.route("/getAllPosts").post(getAllPosts);
router.route("/addLike").post(addLike);

module.exports = router;
