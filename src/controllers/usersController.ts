import { NextFunction, Request, Response } from "express";
import asyncWrapper from "../middlewares/asyncWrapper";
import usersServices from "../services/usersServices";
import httpStatusText from "../utils/httpStatusText";
import { TCombinedUser } from "../schemas/userSchema";
import sendOTPToEmail from "../utils/emailUtils/sendOTPToEmail";
import storeOTP from "../utils/otpUtils/storeOTP";
import paginationParams from "../utils/pagination/paginationParams";

// asyncWrapper(async (req: Request,res: Response,next: NextFunction): Promise<void | Response> => {});

const getAllUsers = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const query = req.query;
    const { limit, offset } = paginationParams(query);

    const { users, paginationData } = await usersServices.getAllUsersService({
      limit,
      offset,
    });
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { users, paginationData },
    });
  }
);

const getUserById = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { userId } = req.params;

    const user = await usersServices.findUserByIdOrEmailService({ userId });

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { user } });
  }
);

const updateUser = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { userId } = req.params;
    const validatedData = req.validatedData as TCombinedUser;

    const updatedUser = await usersServices.updateUserService(
      userId,
      validatedData
    );

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { updatedUser } });
  }
);

const changeEmail = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { userId } = req.params;
    const { newEmail } = req.body as { newEmail: string };

    const user = await usersServices.changeEmailService(userId, newEmail);

    const otp = await storeOTP(userId);
    sendOTPToEmail({ to: newEmail, html: `<h1>OTP: ${otp}</h1>` });

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { message: "OTP code sent to your email", user },
    });
  }
);

const deleteUser = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { userId } = req.params;

    const deletedUser = await usersServices.deleteUserService(userId);

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { deletedUser } });
  }
);

export { getAllUsers, getUserById, updateUser, changeEmail, deleteUser };
