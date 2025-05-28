import express from "express";
const router = express.Router();
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import sendOtpEmail from "../utils/sendEmail.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email });
  }

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  try {
    await sendOtpEmail(email, otp);
    res.json({ msg: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
    return res.status(400).json({ msg: "Invalid or expired OTP" });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, user: { id: user._id, email: user.email } });
});

export default router;
