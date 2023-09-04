const notification = require("../models/notification");

exports.addNotification = async (body) => {
  try {
    const { notifier, receiver, message, category } = body;
    const data = await notification.create({
      notifier,
      receiver,
      message,
      category,
    });
    return data;
  } catch (ex) {
    console.log("ex", ex);
  }
};

//get all notification of a reciever logged in wihh seen false
exports.getNotificationUnseen = async (req, res) => {
  try {
    const id = req.user._id;
    const data = await notification
      .find({ receiver: id, seen: false })
      .sort({ timestamps: -1 });
    if (data) return res.send(data).status(200);
    else return res.send(false).status(400);
  } catch (ex) {
    console.log("ex", ex);
  }
};

//seen true of a notification of a user given by req.params
exports.seenNotification = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await notification.updateOne(
      { _id: id },
      { $set: { seen: true } }
    );
    if (data) return res.send(true).status(200);
    else return res.send(false).status(400);
  } catch (ex) {
    console.log("ex", ex);
  }
};

//set the seen true of all notifications of a user
exports.seenAllNotification = async (req, res) => {
  try {
    const id = req.user._id;
    const data = await notification.updateMany(
      { receiver: id },
      { $set: { seen: true } }
    );
    if (data) return res.send(true).status(200);
    else return res.send(false).status(400);
  } catch (ex) {
    console.log("ex", ex);
  }
};
