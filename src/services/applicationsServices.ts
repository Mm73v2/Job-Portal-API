import Application from "../models/ApplicationModel";
import { TApplication } from "../schemas/applicationSchema";
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

const createApplicationService = async (data: TApplication) => {
  try {
    const { jobId } = data;
    const job = await jobsServices.findJobById(jobId);
    if (!job) {
      const error = appError.create("Invalid job ID", 400, httpStatusText.FAIL);
      throw error;
    }
    data.jobId = job.id;
    const application = (await Application.create(data)).toJSON();

    return application;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

export default { getApplicationsService, createApplicationService };
