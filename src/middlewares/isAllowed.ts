import { NextFunction, Response, Request } from "express";
import usersServices from "../services/usersServices";
import appError from "../utils/errorsUtils/appError";
import httpStatusText from "../utils/httpStatusText";

const isAllowed = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = req.currentUser;

      const user = await usersServices.findUserByIdOrEmailService(
        {
          userId: currentUser?.id!,
        },
        ["id"]
      );

      if (!roles.includes(user.Role.role)) {
        const error = appError.create(
          "You are not allowed to do this action",
          401,
          httpStatusText.FAIL
        );
        return next(error);
      }
      req.currentUser!.dbId = user.id;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default isAllowed;
