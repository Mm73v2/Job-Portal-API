import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";
import { fromZodError } from "zod-validation-error";
import httpStatusText from "../utils/httpStatusText";
import appError from "../utils/errorsUtils/appError";

export const validateRequest = <T extends AnyZodObject>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
      const error = appError.create(
        "Validation error",
        400,
        httpStatusText.FAIL,
        fromZodError(validationResult.error).details.map(
          (error) => error.message
        )
      );
      return next(error);
    }

    req.validatedData = validationResult.data as z.infer<T>;
    next();
  };
};
