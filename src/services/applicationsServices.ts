import Application from "../models/ApplicationModel";
import { TApplication } from "../schemas/applicationSchema";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";
import paginationInfo from "../utils/pagination/paginationInfo";

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
    const application = (await Application.create(data)).toJSON();
    return application;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

export default { getApplicationsService, createApplicationService };
