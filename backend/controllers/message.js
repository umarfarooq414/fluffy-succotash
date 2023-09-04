const Messages = require("../models/message");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      // users: {
      //   $all: [from, to],
      // },
      $or: [
        { sender: from, receiver: to },
        { sender: to, receiver: from },
      ],
    })
      .populate("sender", "name _id profileImage createdAt")
      .populate("receiver", "name _id profileImage createdAt")
      .sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        sender: msg.sender,
        receiver: msg.receiver,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const data = this.helperAddMessage(req.body);

    if (data) return res.send(true).status(200);
    else return res.send(false).status(400);
  } catch (ex) {
    next(ex);
  }
};

module.exports.helperAddMessage = async (body) => {
  try {
    const { from, to, message } = body;
    const data = await Messages.create({
      message: { text: message },
      // users: [from, to],
      sender: from,
      receiver: to,
    });
    return data;
  } catch (ex) {
    console.log("ex", ex);
  }
};
