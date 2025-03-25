import { Job, JobProvider, User } from "../models";
import { TJob } from "../schemas/jobSchema";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";
import paginationInfo from "../utils/pagination/paginationInfo";

const getAlljobsService = async (pagination: {
  limit: number;
  offset: number;
}) => {
  try {
    const { limit, offset } = pagination;

    const { count, rows } = await Job.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: JobProvider,
          include: [
            {
              model: User,
              attributes: { exclude: ["id", "password", "deletedAt"] },
            },
          ],
          attributes: { exclude: ["id"] },
        },
      ],
    });
    const paginationData = paginationInfo(count, rows.length, limit);

    return { paginationData, jobs: rows };
  } catch (error) {
    throw handleSequelizeError(error);
  }
};
const createJobService = async (data: TJob) => {
  try {
    const job = (await Job.create(data)).toJSON();
    return job;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

export default { getAlljobsService, createJobService };
