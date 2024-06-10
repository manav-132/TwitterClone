const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("../backend/routes/userRoute");
const AuthRoute = require("../backend/routes/AuthRoute");
const PostRoute = require("../backend/routes/PostRoute");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// Middleware for parsing JSON requests
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      });
      app.use("/images", express.static(path.join(__dirname, "public/images")));
      app.use(express.json());
      app.use(cors());
      app.use(helmet());
      app.use(morgan("common"));
      
      
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          const uploadPath = path.join("public", "images");
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
          },
          filename: function (req, file, cb) {
            const filename = `${file.originalname}`;
    cb(null, filename);
  },
  });
const upload = multer({ storage });


const profilePictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join("public", "images");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = `${file.originalname}`;
    cb(null, filename);
    },
    });
    const upload1 = multer({ storage: profilePictureStorage });
    
    const coverPictureStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        const uploadPath = path.join("public", "images");
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
          const filename = `${file.originalname}`;
          cb(null, filename);
          },
          });
          const upload2 = multer({ storage: coverPictureStorage });
          

          
          
          app.post("/api/upload", upload.single("file"), (req, res) => {
            try {
              return res.status(200).json("File uploaded");
            } catch (error) {
              console.log(error);
              return res.status(500).json({ error: "Internal server error" });
            }
          });
          
          app.post("/api/uploadprofile", upload1.single("file"), (req, res) => {
            try {
              return res.status(200).json("Profile picture uploaded");
            } catch (error) {
              console.log(error);
              return res.status(500).json({ error: "Internal server error" });
            }
          });
          app.post("/api/uploadcover", upload2.single("file"), (req, res) => {
              try {
                return res.status(200).json("Profile picture uploaded");
              } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
              }
            });
          
          app.use("/api/users", userRoute);
          app.use("/api/auth", AuthRoute);
          app.use("/api/post", PostRoute);
          // Start the server
          app.listen(PORT, () => {
            console.log(`Backend is running on port ${PORT}`);
});
