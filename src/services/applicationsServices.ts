import Application from "../models/ApplicationModel";
import { TApplication } from "../schemas/applicationSchema";
import { TJob } from "../schemas/jobSchema";
import appError from "../utils/errorsUtils/appError";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";
import httpStatusText from "../utils/httpStatusText";
import paginationInfo from "../utils/pagination/paginationInfo";
import jobsServices from "./jobsServices";

const getApplicationsService = async (pagination: {
  limit: number;
  offset: number;
}) => {
  try {
    const { limit, offset } = pagination;
    const { count, rows } = await Application.findAndCountAll({
      limit,
      offset,
    });
    const applications = rows;
    const paginationData = paginationInfo(count, rows.length, limit);

    return { paginationData, applications };
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

const getApplicationByIdService = async (applicationId: string) => {
  try {
    const application = await Application.findOne({
      where: { uuid: applicationId },
    });
    if (!application) {
      const error = appError.create(
        "Invalid application ID",
        400,
        httpStatusText.FAIL
      );
      throw error;
    }

    return application;
  } catch (error) {
    handleSequelizeError(error);
  }
};

const createApplicationService = async (data: TApplication) => {
  try {
    const { jobId } = data;
    const job = await jobsServices.findJobById(jobId);
    if (!job) {
      const error = appError.create("Invalid job ID", 400, httpStatusText.FAIL);
      throw error;
    }
    console.log(job);
    if (job.Questions?.length) {
      if (data.answers?.length !== job.Questions?.length) {
        console.log("iam right");
        const error = appError.create(
          "Invalid number of answers",
          400,
          httpStatusText.FAIL
        );
        throw error;
      }
    }

    data.jobId = job.id;
    const application = (await Application.create(data)).toJSON();

    return application;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

export default {
  getApplicationsService,
  getApplicationByIdService,
  createApplicationService,
};
