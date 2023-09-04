const Events = require("../models/event");
var mongoose = require("mongoose");
const User = require("../models/user");

//  mongoose.Types.ObjectId();
const { addNotification } = require("./notification");

//-----------------------------Cloudinary---------------------------------
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dhghdtteg",
  api_key: "523389569168828",
  api_secret: "c_SYdsF1M5IauIZrA3PASXbdVl0",
});

//create event where createdBy is the logged in user withuout helper function
module.exports.createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      eventTime,
      duration,
      category,
      totalLimit,
      oneTime,
    } = req.body;
    const formatedTime = new Date(eventTime);

    //upload image to cloudinary
    const imagePath = req.files.image; //name on postman
    cloudinary.uploader.upload(imagePath.tempFilePath, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        //if everything is ok
        console.log(result);
        const image = result.url;
        //create new user
        const newEvent = new Events({
          title,
          description,
          eventTime: formatedTime,
          duration,
          category,
          totalLimit,
          oneTime,
          image,
          createdBy: req.user._id,
        });
        newEvent.save(async (err, result) => {
          if (err) {
            console.log(err);
            return res.status(401).json({
              error: "Error saving event in database. Try later",
            });
          }
          //find all user who have same interests as the event
          const users = await User.find({
            interests: { $in: newEvent.category },
          });
          //send notification to all users who have same interests as the event
          users.forEach((user) => {
            const payload = {
              notifier: req.user._id,
              receiver: user._id,
              message: `${newEvent.title} with matched interest is created`,
              category: "newEvent",
            };
            const data = addNotification(payload);
          });

          return res.json({
            message: "Creation success. Please login.",
          });
        });
      }
    });
  } catch (ex) {
    next(ex);
  }
};

//get all events sorted by timestamp and populate createdBy and iscancelled is false and also populate the joiners array and populate pendingRequests array and also event date is greater than today
module.exports.getEvents = async (req, res, next) => {
  try {
    const data = await Events.find({
      isCancelled: false,
    })
      .populate("createdBy", "name _id profileImage createdAt")
      .populate("joiners", "name _id profileImage createdAt")
      .populate("pendingRequests", "name _id profileImage createdAt")
      .sort({ createdAt: -1 });
    data.forEach((game) => {
      if (game.favourites.includes(req.user._id)) {
        game.isFavourite = true;
      }
    });
    if (data) return res.send(data).status(200);
    else return res.send(false).status(400);
  } catch (ex) {
    next(ex);
  }
};

//get all events sorted by timestamp and created by current logged in user
module.exports.getMyEvents = async (req, res, next) => {
  try {
    const data = await Events.find({ createdBy: req.user._id })
      .populate("createdBy", "name _id profileImage createdAt")
      .populate("joiners", "name _id profileImage createdAt")
      .populate("pendingRequests", "name _id profileImage createdAt")
      .sort({ createdAt: 1 });
    data.forEach((game) => {
      if (game.favourites.includes(req.user._id)) {
        game.isFavourite = true;
      }
    });
    if (data) return res.send(data).status(200);
    else return res.send(false).status(400);
  } catch (ex) {
    next(ex);
  }
};

//get all events sorted by timestamp and joined by current logged in user
module.exports.getJoinedEvents = async (req, res, next) => {
  try {
    const data = await Events.find({ joiners: req.user._id });
    data.forEach((game) => {
      if (game.favourites.includes(req.user._id)) {
        game.isFavourite = true;
      }
    });
    if (data) return res.send(data).status(200);
    else return res.send(false).status(400);
  } catch (ex) {
    next(ex);
  }
};

//get single event by id and populate createdBy and joiners and pendingRequests
module.exports.getSingleEvent = async (req, res, next) => {
  try {
    const data = await Events.findById(req.params.id)
      .populate("createdBy", "name _id profileImage createdAt")
      .populate("joiners", "name _id profileImage email gender createdAt")
      .populate(
        "pendingRequests",
        "name _id profileImage email gender createdAt"
      );

    if (data.favourites.includes(req.user._id)) {
      data.isFavourite = true;
    }
    if (data.createdBy._id.equals(mongoose.Types.ObjectId(req.user._id))) {
      console.log("here");
      data.isOwner = true;
    } else {
      console.log("there");
      data.isOwner = false;
    }
    if (data) return res.send(data).status(200);
    else return res.send(false).status(400);
  } catch (ex) {
    next(ex);
  }
};

//set iscancel true if current logged in user is the creator of the event
module.exports.cancelEvent = async (req, res, next) => {
  try {
    const data = await Events.findById(req.params.id);
    if (data.createdBy._id.equals(mongoose.Types.ObjectId(req.user._id))) {
      data.isCancelled = true;
      await data.save();
      return res.json({ message: "Event is cancelled" }).status(200);
    } else
      return res.json({ message: "Event cannot be cancelled" }).status(400);
  } catch (ex) {
    next(ex);
  }
};

module.exports.completeEvent = async (req, res, next) => {
  try {
    const data = await Events.findById(req.params.id);
    if (data.createdBy._id.equals(mongoose.Types.ObjectId(req.user._id))) {
      data.isCompleted = true;
      await data.save();
      return res.json({ message: "Event is Completed" }).status(200);
    } else
      return res.json({ message: "Event cannot be Completed" }).status(400);
  } catch (ex) {
    next(ex);
  }
};

//favourite and unfavourite an event
exports.favouriteGame = (req, res) => {
  const gameId = req.params.id;
  Events.findById(gameId).exec((err, result) => {
    if (err) {
      return next(new AppError("Could not update like count", 400));
    }
    console.log(result.favourites);
    if (result.favourites && !result.favourites.includes(req.user._id)) {
      //if user has not liked the post. Like it
      Events.findByIdAndUpdate(
        gameId,
        { $push: { favourites: req.user._id } },
        { upsert: true, new: true }
      ).exec((err, result) => {
        if (err) {
          return next(new AppError("Could not update like count", 400));
        }
        res.status(200).json({
          status: "success",
          data: result,
        });
      });
    } else {
      //if user has liked the post. Dislike it
      Events.findByIdAndUpdate(
        gameId,
        { $pull: { favourites: req.user._id } },
        { upsert: true, new: true }
      ).exec((err, result) => {
        if (err) {
          return next(new AppError("Could not update like count", 400));
        }
        res.status(200).json({
          status: "success",
          data: result,
        });
      });
    }
  });
};

//get all games where userId is in favourites array
exports.userFav = async (req, res) => {
  try {
    const allGames = await Events.find({ favourites: req.user._id })
      .populate("createdBy", "name _id profileImage createdAt")
      .populate("joiners", "name _id profileImage email gender createdAt")
      .populate(
        "pendingRequests",
        "name _id profileImage email gender createdAt"
      );
    //append true in allGames where the userId is present in the favourite array
    allGames.forEach((game) => {
      if (game.favourites.includes(req.user._id)) {
        game.isFavourite = true;
      }
    });
    res.status(200).json({ allGames });
  } catch (err) {
    console.log(err);
  }
};

//delete event if current logged in user is the creator of the event
module.exports.deleteEvent = async (req, res, next) => {
  try {
    const data = await Events.findById(req.params.id);
    if (data.createdBy._id.equals(mongoose.Types.ObjectId(req.user._id))) {
      await Events.findByIdAndDelete(req.params.id);
      return res.json({ message: "Event is deleted" }).status(200);
    } else return res.json({ message: "Event cannot be deleted" }).status(400);
  } catch (ex) {
    next(ex);
  }
};

//find by id and update event
module.exports.updateEvent = async (req, res, next) => {
  try {
    const data = await Events.findById(req.params.id);
    if (data.createdBy._id.equals(mongoose.Types.ObjectId(req.user._id))) {
      const {
        title,
        description,
        eventTime,
        duration,
        category,
        totalLimit,
        oneTime,
      } = req.body;
      const formatedTime = new Date(eventTime);
      const updatedEvent = await Events.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          eventTime: formatedTime,
          duration,
          category,
          totalLimit,
          oneTime,
        },
        { new: true }
      );
      console.log(updatedEvent)
      await updatedEvent.save()
      return res.json(updatedEvent).status(200);
    } else return res.json({ message: "Event cannot be updated" }).status(400);
  } catch (ex) {
    next(ex);
  }
};

//add current userId in pendingRequests array of event only if the joiners array.length() is less than totalLimit
module.exports.joinEvent = async (req, res, next) => {
  try {
    const data = await Events.findById(req.params.id);
    console.log(data);
    if (
      data.joiners?.length < data.totalLimit &&
      !data.joiners.includes(req.user._id) &&
      !data.pendingRequests.includes(req.user._id)
    ) {
      data.pendingRequests.push(req.user._id);
      await data.save();
      return res.json({ message: "Join request sent" }).status(200);
    } else
      return res.json({ message: "Join request cannot be sent" }).status(400);
  } catch (ex) {
    next(ex);
  }
};

//delete req.body.userId from pendingRequests array of event
module.exports.cancelJoinRequest = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const data = await Events.findById(req.params.id);

    //remove userId from pendingRequests array of event
    data.pendingRequests = data.pendingRequests.filter(
      (id) => !id.equals(mongoose.Types.ObjectId(userId))
    );
    await data.save();
    const payload = {
      notifier: req.user._id,
      receiver: userId,
      message: `Join request for ${data.title} rejected`,
      category: "newUser",
    };
    const notify = addNotification(payload);
    return res.json({ message: "Join request cancelled" }).status(200);
  } catch (ex) {
    next(ex);
  }
};
//delete req.body.userId from pendingRequests array of event and add userId in joiners array of event
module.exports.acceptJoinRequest = async (req, res, next) => {
  const  userId  = req.body['data[userId]'];
  try {
    console.log(userId)
    const data = await Events.findById(req.params.id);

    //remove userId from pendingRequests array of event
    data.pendingRequests = data.pendingRequests.filter(
      (id) => !id.equals(mongoose.Types.ObjectId(userId))
    );
    //add userId in joiners array of event
    data.joiners.push(userId);
    await data.save();
    const payload = {
      notifier: req.user._id,
      receiver: userId,
      message: `Join request for ${data.title} accepted`,
      category: "newUser",
    };
    const notify = addNotification(payload);
    return res.json({ message: "Join request accepted" }).status(200);
  } catch (ex) {
    next(ex);
  }
};

//event sorted by popularity
module.exports.popularEvents = async (req, res, next) => {
  try {
    Events.find()
      .sort({ "joiners.length": -1 }) // Sort in descending order of joiners.length
      .exec((err, events) => {
        if (err) {
          return res.status(400).json({
            error: "Cannot sort by popularity",
          });
        } else {
          return res.status(200).json({
            events,
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};
