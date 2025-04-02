import { Transaction } from "sequelize";
import sequelize from "../config/sequelizeConfig";
import { Job, JobProvider, Question, User } from "../models";
import { TJob } from "../schemas/jobSchema";
import { TQuestion } from "../schemas/questionSchema";
import appError from "../utils/errorsUtils/appError";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";
import httpStatusText from "../utils/httpStatusText";
import paginationInfo from "../utils/pagination/paginationInfo";
import questionsService from "./questionsService";

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

const findJobById = async (jobId: string) => {
  try {
    const job = (
      await Job.findOne({
        where: { uuid: jobId },
        include: { model: Question, through: { attributes: [] } },
      })
    )?.toJSON();
    if (!job) {
      const error = appError.create("Invalid job ID", 400, httpStatusText.FAIL);
      throw error;
    }
    return job;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

const handleRequestQuestions = async (
  requestQuestions: TQuestion[],
  transaction: Transaction
) => {
  let standardQuestions: TQuestion[] = [];
  let customQuestions: TQuestion[] = [];
  let createdQuestions: TQuestion[] = [];

  if (requestQuestions) {
    for (let i = 0; i < requestQuestions.length; i++) {
      if (requestQuestions[i].type === "standard") {
        standardQuestions.push(requestQuestions[i]);
      } else {
        customQuestions.push(requestQuestions[i]);
      }
    }
  }

  if (customQuestions.length > 0) {
    createdQuestions = await questionsService.createQuestionService(
      customQuestions,
      transaction
    );
    const jobQuestions = [...createdQuestions, ...standardQuestions];
    return jobQuestions;
  }

  return standardQuestions;
};

const createJobService = async (data: TJob) => {
  const transaction = await sequelize.transaction();
  try {
    const { questions: requestQuestions, ...jobData } = data;

    const job = (await Job.create(jobData)).toJSON();

    if (requestQuestions) {
      const jobQuestionsIds = await handleRequestQuestions(
        requestQuestions as TQuestion[],
        transaction
      );

      const jobQuestionsData = jobQuestionsIds.map((question) => ({
        jobId: job.id,
        questionId: question.id!,
      }));

      const jobQuestions = await questionsService.createJobQuestionService(
        jobQuestionsData,
        transaction
      );

      (await transaction).commit();

      const createdJobData = await findJobById(job.uuid);
      return createdJobData;
    }

    (await transaction).commit();
    return job;
  } catch (error) {
    (await transaction).rollback();
    throw handleSequelizeError(error);
  }
};

export default { getAlljobsService, createJobService, findJobById };
