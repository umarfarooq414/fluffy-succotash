const express = require("express");
const router = express.Router();

// import middlewares
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
  confirmation,
} = require("../controllers/auth");
// import validator

// import controllers
const { read, update, users, profile } = require("../controllers/user");

// routes
router.get("/user", requireSignin, authMiddleware, read);
router.get("/admin", requireSignin, adminMiddleware, read);
router.put("/update", requireSignin, authMiddleware, update);
router.get("/users", requireSignin, authMiddleware, users);
router.get("/profile", requireSignin, authMiddleware, profile);

module.exports = router;
