const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const { authenticateToken } = require("./userAuth");

const router = express.Router();

// Multer storage configuration to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars"); // Directory for avatars
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp to avoid filename collision
  },
});

const upload = multer({ storage });

// Sign up route
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    const usernameLength = username.length;
    if (usernameLength < 4) {
      return res.status(400).json({
        status: "Error",
        message: "Username must have at least 4 characters.",
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid email format. Please enter a valid email address.",
      });
    }

    const passwordLength = password.length;
    if (passwordLength < 6) {
      return res.status(400).json({
        status: "Error",
        message: "Password must be at least 6 characters long",
      });
    }

    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });
    if (usernameExists || emailExists) {
      return res.status(400).json({
        status: "Error",
        message: usernameExists ? "Username already exists" : "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      address,
    });

    await user.save();
    return res.json({
      status: "Success",
      message: "Signup successful!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    bcrypt.compare(password, user.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: user.username },
          { role: user.role },
          { jti: jwt.sign({}, "bookStore123") },
        ];
        const token = jwt.sign({ authClaims }, "bookStore123", {
          expiresIn: "30d",
        });

        res.json({
          _id: user._id,
          role: user.role,
          token,
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    return res.status(400).json({ message: "Internal Error" });
  }
});

// Get User Data (Profile)
router.get("/getUserData", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Update User Address
router.put("/update-user-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address });
    return res.status(200).json({
      status: "Success",
      message: "Address updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Upload Avatar (with multer)
router.post("/upload-avatar", authenticateToken, upload.single("avatar"), async (req, res) => {
  try {
    const { id } = req.headers;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: avatarPath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }

    res.status(200).json({
      status: "Success",
      message: "Avatar uploaded successfully",
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "An error occurred" });
  }
});

// Remove Avatar
router.delete("/remove-avatar", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: "" }, // Clear the avatar field
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }

    res.status(200).json({
      status: "Success",
      message: "Avatar removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "An error occurred" });
  }
});

module.exports = router;
