const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// STEP 1: Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  // Generate token
  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min

  await user.save();

  const link = `http://localhost:3000/reset/${token}`;

  await sendEmail(email, "Password Reset", `Click here: ${link}`);

  res.json({ msg: "Email sent" });
};

// STEP 2: Verify Token
exports.verifyToken = async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }

  res.json({ msg: "Valid token" });
};

// STEP 3: Reset Password
exports.resetPassword = async (req, res) => {
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ msg: "Token expired" });
  }

  const hashed = await bcrypt.hash(password, 10);

  user.password = hashed;
  user.resetToken = null;
  user.resetTokenExpiry = null;

  await user.save();

  res.json({ msg: "Password updated successfully" });
};