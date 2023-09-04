const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//controllers
const {
  register,
  login,
  requireSignin,
  uploadUserPhoto,
  registerImage,
} = require("../controllers/auth");

router.post("/register", register);
// router.post("/registerImage", uploadUserPhoto, registerImage); //using multer
router.post("/registerImage", registerImage); //using cloudinary
router.post("/login", login);

module.exports = router;
