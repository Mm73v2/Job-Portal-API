import { RequestHandler, Router } from "express";
import {
  forgotPassword,
  login,
  registerUser,
  resendOTP,
  resetPassword,
  verifyOTP,
} from "../controllers/authController";
import upload from "../config/cloudinaryConfig";
import { validateRequest } from "../middlewares/validateRequest";
import {
  combinedJobProviderSchema,
  combinedJobSeekerSchema,
} from "../schemas/userSchema";
import generateSchema from "../schemas/generateSchema";
import resetPasswordSchema from "../schemas/resetPasswordSchema";
const authRouter = Router();

// Register job seeker
authRouter
  .route("/register/job-seeker")
  .post(
    upload.single("image"),
    validateRequest(combinedJobSeekerSchema) as RequestHandler,
    registerUser
  );
// Register job provider
authRouter
  .route("/register/job-provider")
  .post(
    upload.single("image"),
    validateRequest(combinedJobProviderSchema) as RequestHandler,
    registerUser
  );

// Login
const loginSchema = generateSchema(
  { fieldName: "email", fieldType: "email" },
  { fieldName: "password" }
);
authRouter.route("/login").post(validateRequest(loginSchema), login);

// Verify OTP
const verifyOTPSchema = generateSchema(
  { fieldName: "userId" },
  { fieldName: "otp" }
);
authRouter
  .route("/verify-otp")
  .post(validateRequest(verifyOTPSchema), verifyOTP);

// Resend OTP
const resendOTPSchema = generateSchema({ fieldName: "userId" });
authRouter
  .route("/resend-otp")
  .post(validateRequest(resendOTPSchema), resendOTP);

const forgotPasswordSchema = generateSchema({
  fieldName: "email",
  fieldType: "email",
});
authRouter
  .route("/forgot-password")
  .post(validateRequest(forgotPasswordSchema), forgotPassword);

authRouter
  .route("/reset-password")
  .post(validateRequest(resetPasswordSchema), resetPassword);

export default authRouter;
