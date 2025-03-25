import { Request, Response, NextFunction } from "express";

type TAsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | void>;

const asyncWrapper = (asyncFunction: TAsyncFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    asyncFunction(req, res, next).catch((error) => next(error));
  };
};

export default asyncWrapper;
