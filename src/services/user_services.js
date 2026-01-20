import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../models/user_models.js";
import { generateToken } from "../utils/jwt.js";
import { sendOTPEmail } from "../utils/email.js";

const registerUserService = async ({ name, username, email, password }) => {
  const exists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (exists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new Error("Email not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Wrong password");
  }

  const token = generateToken({ id: user._id });

  return { user, token };
};

const changePasswordService = async ({ userId, oldPassword, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();
  return user;
};

const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) return;

  const otp = crypto.randomInt(100000, 999999).toString();

  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  user.resetPasswordToken = hashedOTP;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save();

  console.log("📧 Sending OTP to:", email);

  try {
    await sendOTPEmail(email, otp);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed", error);
  }
};

const verifyOTPService = async (otp) => {
  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedOTP,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired OTP");
  }

  return true;
};

const resetPasswordService = async ({ email, otp, newPassword }) => {
  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    email,
    resetPasswordToken: hashedOTP,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired OTP");
  }

  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
};

const logoutUserService = async () => {
  // JWT-based logout is handled client-side
  return true;
};

export {
  registerUserService,
  loginUserService,
  changePasswordService,
  forgotPasswordService,
  verifyOTPService,
  resetPasswordService,
  logoutUserService,
};
