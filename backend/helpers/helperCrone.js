const schedule = require("node-schedule");
const Events = require("../models/event");
const { addNotification } = require("../controllers/notification");
const notification = require("../models/notification");

// crone job
module.exports.scheduleRemind = () => {
  schedule.scheduleJob("* * * * * *", async () => {
    try {
      //get all events and populate the joiners array and store in data variable
      const data = await Events.find({}).populate("joiners");
      //loop through the data and check if the event is today
      data.forEach((event) => {
        //get the date of the event
        const date = new Date(event.date);
        //get the current date
        const today = new Date();
        //check if the event is today
        if (date.getDate() === today.getDate()) {
          //loop through the joiners array and send them a notification
          event.joiners.forEach((joiner) => {
            //send notification to the joiner
            addNotification({
              notifier: event.user,
              receiver: joiner._id,
              message: `Reminder: ${event.title} is today`,
              category: "reminder",
            });
          });
        }
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
};
