import Application from "../models/ApplicationModel";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";
import paginationInfo from "../utils/pagination/paginationInfo";

const getApplications = async (pagination: {
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

export default { getApplications };
