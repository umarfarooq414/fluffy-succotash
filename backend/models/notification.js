const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    notifier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "like",
        "comment",
        "follow",
        "chat",
        "post",
        "newUser",
        "newEvent",
      ],
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", NotificationSchema);
