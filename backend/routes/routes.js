const express = require("express");
const router = express.Router();
const upload = require("./avatarUpload"); // Import the multer config
const fs = require("fs");
const path = require("path");

// Assuming you have a User model or similar for database operations
const User = require("../models/user");

// 1. Upload avatar
router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  try {
    // Retrieve user ID from the request (assuming it's in the body or session)
    const userId = req.body.id || req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save the file path in the user database (you may save it as a URL depending on your setup)
    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(userId, { avatar: avatarPath }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user info
    res.json({ avatar: avatarPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 2. Remove avatar
router.delete("/remove-avatar", async (req, res) => {
  try {
    const userId = req.body.id || req.user.id;

    const user = await User.findById(userId);
    if (!user || !user.avatar) {
      return res.status(404).json({ message: "User or avatar not found" });
    }

    // Remove the avatar file from the server (if it exists)
    const avatarPath = path.join(__dirname, "../public", user.avatar);
    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath); // Delete file
    }

    // Update user to remove avatar
    user.avatar = null;
    await user.save();

    res.json({ message: "Avatar removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
