const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { emailVerification } = require("../helpers/emailVerification");
const { addNotification } = require("../controllers/notification");
//-----------------------------Cloudinary---------------------------------
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dhghdtteg",
  api_key: "523389569168828",
  api_secret: "c_SYdsF1M5IauIZrA3PASXbdVl0",
});
//-------------------------------Multer---------------------------------
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
exports.uploadUserPhoto = upload.single("profileImage");

//-------------------------------------Register-------------------------------------
exports.register = async (req, res) => {
  //console.log("reg con",req.body);
  const { name, email, password, DOB, gender } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    //new user
    const newUser = new User({ name, email, password, DOB, gender });
    newUser.save(async (err, result) => {
      if (err) {
        return res.status(401).json({
          error: "Error saving user in database. Try later",
        });
      }
      const payload = {
        notifier: newUser._id,
        receiver: "6479120b4cb1b7e8c94cbb56",
        message: `New user ${newUser.name} has been registered`,
        category: "newUser",
      };
      const data = addNotification(payload);
      if (data) {
        return res.json({
          message: "Registration success. Please login.",
        });
      } else {
        return res.status(401).json({
          error: "Error saving user in database from notification. Try later",
        });
      }
    });
  });
};

//-------------------------------------Register Image usign multer-------------------------------------
// exports.registerImage = async (req, res) => {
//   // console.log(req.file);
//   const profileImage = req.file.filename;
//   const { name, email, password, gender } = req.body;
//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: "Email is taken",
//       });
//     }
//     //new user
//     const newUser = new User({ name, email, password, profileImage, gender });
//     newUser.save(async (err, result) => {
//       if (err) {
//         console.log(err);
//         return res.status(401).json({
//           error: "Error saving user in database. Try later",
//         });
//       }
//       return res.json({
//         message: "Registration success. Please login.",
//       });
//     });
//   });
// };

//-------------------------------------Register Image usign cloudinary-------------------------------------
exports.registerImage = async (req, res) => {
  const { name, email, password, gender, interests } = req.body;
  const interest = interests.split(',')
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    //upload image to cloudinary
    const imagePath = req.files.profileImage; //name on postman
    cloudinary.uploader.upload(imagePath.tempFilePath, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        //if everything is ok
        console.log(result);
        const profileImage = result.url;
        //create new user
        console.log(interests)
        
        const newUser = new User({
          name,
          email,
          password,
          profileImage,
          gender,
          interests:interest,
        });
        console.log(newUser)
        newUser.save(async (err, result) => {
          if (err) {
            console.log(err);
            return res.status(401).json({
              error: "Error saving user in database. Try later",
            });
          }
          const payload = {
            notifier: newUser._id,
            receiver: "6479120b4cb1b7e8c94cbb56",
            message: `New user ${newUser.name} has been registered`,
            category: "newUser",
          };
          const data = addNotification(payload);
          if (data) {
            return res.json({
              message: "Registration success. Please login.",
            });
          } else {
            return res.status(401).json({
              error:
                "Error saving user in database from notification. Try later",
            });
          }
        });
      }
    });
  });
};

//------------------------------------- Login ------------------------------------
exports.login = (req, res) => {
  const { email, password } = req.body;
  // console.table({ email, password });
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please register.",
      });
    }
    //if email is not confirmed
    if (!user.isConfirm) {
      return res
        .status(401)
        .json({ message: "Please confirm your email to login" });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    // generate token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user: user,
    });
  });
};

//-------------------------------------Require SignIn-------------------------------------
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
}); // req.user

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findOne({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

//-------------------------------------Admin check-------------------------------------
exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findOne({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== "Admin") {
      return res.status(400).json({
        error: "Admin resource. Access denied",
      });
    }

    req.profile = user;
    next();
  });
};
//--------------------------Confirmation------------------------------
exports.confirmation = async (req, res) => {
  try {
    const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    await User.findByIdAndUpdate(id, { isConfirm: true });
  } catch (e) {
    res.send("error");
  }

  return res.redirect("http://localhost:3000/login");
};
