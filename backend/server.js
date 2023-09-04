const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const { helperAddMessage } = require("./controllers/message");
const app = express();
const { scheduleRemind } = require("./helpers/helperCrone");
//-------------socket.io setup------------------
const server = require("http").createServer(app);
const socketIO = require("socket.io");

//--------------------------Db-----------------------
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const notificationRoutes = require("./routes/notification");
const eventRoutes = require("./routes/event");
const global = require("./routes/global");

//app-middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

//middlewares
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/event", eventRoutes);

app.use("/api", global);

app.get("/", (req, res) => {
  res.send("Hello!");
});

const port = process.env.PORT || 8000;
const serverr = app.listen(port, () =>
  console.log(`API is running on port ${port}`)
);
const io = socketIO(serverr, {
  cors: {
    origin: "*",
  },
  // Add any additional options here
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  console.log("connected to socket");
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId.userId, socket);
  });

  socket.on("send-msg", (data) => {
    const res = helperAddMessage(data);
    if (res) {
      const senderUserSocket = onlineUsers.get(data.from);
      if (senderUserSocket) {
        senderUserSocket.emit("send-msg", data);
      }
      const receiveUserSocket = onlineUsers.get(data.to);
      if (receiveUserSocket) {
        receiveUserSocket.emit("msg-receive", data);
      }
    }
  });
});
let count = 0;
setInterval(function () {
  io.emit("hy g", "client", "test msg" + count);
  count++;
}, 1000);

scheduleRemind();
