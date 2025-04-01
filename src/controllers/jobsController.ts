import { NextFunction, Request, Response } from "express";
import asyncWrapper from "../middlewares/asyncWrapper";
import httpStatusText from "../utils/httpStatusText";
import { TJob } from "../schemas/jobSchema";
import jobsServices from "../services/jobsServices";
import paginationParams from "../utils/pagination/paginationParams";
// asyncWrapper(async (req: Request,res: Response,next: NextFunction): Promise<void | Response> => {});

const getAllJobs = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const query = req.query;

    const pagination = paginationParams(query);

    const { paginationData, jobs } = await jobsServices.getAlljobsService(
      pagination
    );

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { jobs, paginationData } });
  }
);

const getJob = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { jobId } = req.params;
    const job = await jobsServices.findJobById(jobId);

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { job } });
  }
);

const createJob = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const jobProviderId = req.currentUser?.dbId;
    const jobData = req.validatedData as TJob;
    jobData.jobProviderId = jobProviderId!;
    console.log(jobData);
    // const createdJob = await jobsServices.createJobService(jobData);
    const createdJob = { test: "test" };
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { createdJob } });
  }
);

export { getAllJobs, getJob, createJob };
