import { NextFunction, Request, Response } from "express";
import asyncWrapper from "../middlewares/asyncWrapper";
import applicationsServices from "../services/applicationsServices";
import paginationParams from "../utils/pagination/paginationParams";
import httpStatusText from "../utils/httpStatusText";
import { TApplication } from "../schemas/applicationSchema";

const getAllApplications = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const query = req.query;

    const pagination = paginationParams(query);

    const { paginationData, applications } =
      await applicationsServices.getApplicationsService(pagination);

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { applications, paginationData },
    });
  }
);

const createApplication = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const applicationData = req.validatedData as TApplication;
    const currentUserDbId = req.currentUser?.dbId;
    applicationData.userId = currentUserDbId?.toString();
    const createdApplication =
      await applicationsServices.createApplicationService(applicationData);

    return res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: { createdApplication },
    });
  }
);

export { getAllApplications, createApplication };
