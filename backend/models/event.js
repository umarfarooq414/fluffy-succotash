const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    eventTime: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      default:
        "data:image/jpeg;base64,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",
    },
    duration: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    oneTime: {
      type: String,
      default: "oneTime",
      enum: ["oneTime", "recurring"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Web", "App", "AI"],
    },
    joiners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    totalLimit: {
      type: Number,
      default: 5,
    },
    pendingRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    isCancelled: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    isOwner: {
      type: Boolean,
      default: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("event", EventSchema);
