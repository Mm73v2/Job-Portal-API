import { NextFunction, Request, Response } from "express";
import jobsServices from "../services/jobsServices";
import appError from "../utils/errorsUtils/appError";
import httpStatusText from "../utils/httpStatusText";

const checkJobQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const job = await jobsServices.findJobById(req.body.jobId);

  if (!job) {
    const error = appError.create("Invalid job ID", 400, httpStatusText.FAIL);
    next(error);
  }
};
