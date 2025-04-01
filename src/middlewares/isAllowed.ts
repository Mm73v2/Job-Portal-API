import { NextFunction, Response, Request } from "express";
import appError from "../utils/errorsUtils/appError";
import httpStatusText from "../utils/httpStatusText";
import authServices from "../services/authServices";

const isAllowed = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = req.currentUser;

      const userRole = await authServices.getRoleByIdService(
        currentUser?.role!
      );

      if (!roles.includes(userRole.role)) {
        const error = appError.create(
          "You are not allowed to do this action",
          401,
          httpStatusText.FAIL
        );
        return next(error);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default isAllowed;
