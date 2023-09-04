const {
  createEvent,
  getEvents,
  getMyEvents,
  getJoinedEvents,
  getSingleEvent,
  cancelEvent,
  completeEvent,
  favouriteGame,
  userFav,
  deleteEvent,
  updateEvent,
  joinEvent,
  cancelJoinRequest,
  acceptJoinRequest,
  popularEvents,
} = require("../controllers/event");
const router = require("express").Router();
// import middlewares
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

router.post("/create", requireSignin, authMiddleware, createEvent);
router.get("/get", requireSignin, authMiddleware, getEvents);
router.get("/getmyevents", requireSignin, authMiddleware, getMyEvents);
router.get("/getmyjoined", requireSignin, authMiddleware, getJoinedEvents);
router.get("/getsingle/:id", requireSignin, authMiddleware, getSingleEvent);
router.put("/cancel/:id", requireSignin, authMiddleware, cancelEvent);
router.put("/complete/:id", requireSignin, authMiddleware, completeEvent);
router.put("/favourite/:id", requireSignin, authMiddleware, favouriteGame);
router.get("/myFavourite", requireSignin, authMiddleware, userFav);
router.delete("/delete/:id", requireSignin, authMiddleware, deleteEvent);
router.put("/update/:id", requireSignin, authMiddleware, updateEvent);
router.put("/join/:id", requireSignin, authMiddleware, joinEvent);
router.put("/cancelJoin/:id", requireSignin, authMiddleware, cancelJoinRequest);
router.put("/acceptJoin/:id", requireSignin, authMiddleware, acceptJoinRequest);
router.get("/popular", popularEvents);

module.exports = router;
