const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getSingleUser,
  updateUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect);
router.route("/login").post(authUser);
router.route("/getSingleUser").post(protect,getSingleUser);
router.route("/userUpdate").post(updateUser);

module.exports = router;
