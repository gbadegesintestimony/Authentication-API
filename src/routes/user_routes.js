import { Router } from "express";
import {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyOTP,
  logoutUser,
} from "../controllers/user_controllers.js";
import { protect } from "../middlewares/auth_middlewares.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

// Protected routes
router.post("/change-password", protect, changePassword);
router.post("/logout", protect, logoutUser);

export default router;
