import {
  registerUserService,
  loginUserService,
  changePasswordService,
  forgotPasswordService,
  resetPasswordService,
  verifyOTPService,
  logoutUserService,
} from "../services/user_services.js";

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // basic validation
    if (!name || !username || !password || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // Validate name length
    if (name.trim().length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters",
      });
    }

    // Validate username length
    if (username.trim().length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Validate password length BEFORE hashing

    if (password.length < 8 || password.length > 50) {
      return res.status(400).json({
        message: "Password must be between 8 and 50 characters",
      });
    }

    const user = await registerUserService(req.body);

    res.status(201).json({
      message: "User created successfully",
      user: {
        name: user.name,
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "enter login details" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const { user, token } = await loginUserService(req.body);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    // Validate required fields
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Both old and new passwords are required",
      });
    }

    // Validate new password length
    if (newPassword.length < 8 || newPassword.length > 50) {
      return res.status(400).json({
        message: "New password must be between 8 and 50 characters",
      });
    }

    // Check if old and new passwords are the same
    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from old password",
      });
    }

    const updatedUser = await changePasswordService({
      userId: req.user.id,
      ...req.body,
    });

    res.status(200).json({
      message: "Password changed successfully",
      updatesAt: updatedUser.updatedAt,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validate required field
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }
  await forgotPasswordService(email);
  res.status(200).json({ message: "OTP sent if user exists" });
};

const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    // Validate required field
    if (!otp) {
      return res.status(400).json({
        message: "OTP is required",
      });
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        message: "OTP must be a 6-digit number",
      });
    }

    await verifyOTPService(req.body.otp);
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate required fields
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP, and new password are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        message: "OTP must be a 6-digit number",
      });
    }

    // Validate new password length
    if (newPassword.length < 8 || newPassword.length > 50) {
      return res.status(400).json({
        message: "New password must be between 8 and 50 characters",
      });
    }
    await resetPasswordService(req.body);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    await logoutUserService();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
  logoutUser,
};
