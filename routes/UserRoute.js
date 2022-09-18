const express = require("express");
const multer = require("multer");
const { storage } = require("../db/database");
const router = express.Router();
const upload = multer({ storage });

const {
  addUser,
  loginUser,
  renderImage,
  getAllUsers,
  getLoggedInUserDetails,
} = require("../controllers/UserController");

router.post("/user", upload.single("file"), addUser);
router.post("/login/user", loginUser);
router.get("/user/:loggedId", getAllUsers);
router.get("/image/:filename", renderImage);
router.get("/user/logged/:loggedId", getLoggedInUserDetails);

module.exports = router;
