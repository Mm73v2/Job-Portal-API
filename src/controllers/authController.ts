import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../middlewares/asyncWrapper";
import authServices from "../services/authServices";
import httpStatusText from "../utils/httpStatusText";
import { TCombinedUser, TJobProvider, TJobSeeker } from "../schemas/userSchema";
import hashResource from "../utils/hashUtils/hashResource";
import sendOTPToEmail from "../utils/emailUtils/sendOTPToEmail";
import storeOTP from "../utils/otpUtils/storeOTP";
import verifyOTPCode from "../utils/otpUtils/verifyOTPCode";
import usersServices from "../services/usersServices";
import appError from "../utils/errorsUtils/appError";
import compareResource from "../utils/hashUtils/compareResource";
import generateJwt from "../utils/jwtUtils/generateJWT";
import otpEmailTemp from "../utils/emailUtils/OTPEmialTemp";
// asyncWrapper(async (req: Request,res: Response,next: NextFunction): Promise<void | Response> => {});

const registerUser = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    let validatedData = req.validatedData as TCombinedUser;
    let createdUser;
    console.log(req.url);
    const { password } = validatedData;
    const hashedPassword = hashResource(password);
    validatedData.password = hashedPassword;

    switch (req.path) {
      case "/register/job-seeker":
        validatedData = req.validatedData as TJobSeeker;
        createdUser = (await authServices.registerJobSeekerService(
          validatedData
        )) as TJobSeeker;
        break;
      case "/register/job-provider":
        validatedData = req.validatedData as TJobProvider;
        createdUser = (await authServices.registerJobProviderService(
          validatedData
        )) as TJobProvider;
        break;
      default:
        return;
    }

    const { uuid, email } = createdUser;
    // Sending OTP
    const otp = await storeOTP(uuid!);
    sendOTPToEmail({ to: email, html: otpEmailTemp(otp, email) });

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { createdUser } });
  }
);

const login = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { email, password } = req.validatedData as {
      email: string;
      password: string;
    };
    const user = await authServices.loginService(email);

    if (!compareResource(password, user.password)) {
      const error = appError.create(
        "Invalid credentials",
        400,
        httpStatusText.FAIL
      );
      return next(error);
    }

    const tokenPayload = {
      id: user.id,
      uuid: user.uuid,
      email: user.email,
      role: user.roleId,
    };

    const token = generateJwt(tokenPayload);
    delete user.password;
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { user, token } });
  }
);

const verifyOTP = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { userId, otp } = req.validatedData as {
      userId: string;
      otp: string;
    };

    const isOtpCorrect = await verifyOTPCode(userId, otp);
    if (isOtpCorrect) {
      const verifiedUser = await authServices.verifyUserService(userId);
      return res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { message: "Email verified successfully!", user: verifiedUser },
      });
    }
  }
);

const resendOTP = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { userId } = req.validatedData as {
      userId: string;
    };

    const user = await usersServices.findUserByIdOrEmailService({ userId });

    if (user.verified) {
      const error = appError.create(
        "This user is already verified",
        400,
        httpStatusText.FAIL
      );
      return next(error);
    }

    const otp = await storeOTP(userId!);
    sendOTPToEmail({ to: user.email, html: otpEmailTemp(otp, user.email) });

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { message: "OTP code sent to email" },
    });
  }
);

const forgotPassword = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { email } = req.validatedData as { email: string };

    const user = await usersServices.findUserByIdOrEmailService({ email });

    const otp = await storeOTP(email);
    sendOTPToEmail({ to: email, html: otpEmailTemp(otp, email) });

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { message: "Reset password otp sent to email successfully" },
    });
  }
);

const resetPassword = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { email, otp, newPassword } = req.validatedData as {
      email: string;
      otp: string;
      newPassword: string;
    };

    const isOTPCorrect = await verifyOTPCode(email, otp.toString());
    if (isOTPCorrect) {
      const hashedPassword = hashResource(newPassword);
      await authServices.resetPasswordService(email, hashedPassword);
      return res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { message: "Password reseted successfully" },
      });
    }
  }
);

export {
  registerUser,
  login,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
};
