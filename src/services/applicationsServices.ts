import Application from "../models/ApplicationModel";
import answersServices from "./answersServices";
import { TAnswer } from "../schemas/answerSchema";
import { TApplication } from "../schemas/applicationSchema";
import appError from "../utils/errorsUtils/appError";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";
import httpStatusText from "../utils/httpStatusText";
import paginationInfo from "../utils/pagination/paginationInfo";
import jobsServices from "./jobsServices";
import { TQuestion } from "../schemas/questionSchema";
import sequelize from "../config/sequelizeConfig";
import { Transaction } from "sequelize";

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

// const validateAnswersSchema = (answers: TAnswer[]) => {
//   const answersErrors = z.array(answerSchema).safeParse(answers);
//   console.log(answers);
//   if (!answersErrors.success) {
//     const error = appError.create(
//       "Validation error",
//       400,
//       httpStatusText.FAIL,
//       fromZodError(answersErrors.error).details.map((error) => error.message)
//     );
//     throw error;
//   }
// };

const validateAnswers = (questions: TQuestion[], answers: TAnswer[]) => {
  if (questions?.length) {
    if (answers?.length !== questions?.length) {
      console.log("iam right");
      const error = appError.create(
        "Invalid number of answers",
        400,
        httpStatusText.FAIL
      );
      throw error;
    }
  }
};

const addApplicationAnswers = async (
  answers: TAnswer[],
  userId: string,
  applicationId: string,
  transaction: Transaction
) => {
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].questionType === "standard" && answers[i].save) {
      answers[i].userId = userId;
      const answer = await answersServices.createAnswerService(
        answers[i],
        transaction
      );
    }
    // const {} = answers[i]
    answers[i].applicationId = applicationId;
    const applicationAnswer =
      await answersServices.createApplicationAnswerService(
        answers[i],
        transaction
      );
  }
};

const createApplicationService = async (data: TApplication) => {
  const transaction = await sequelize.transaction();
  try {
    const { jobId } = data;
    const job = await jobsServices.findJobById(jobId);
    if (!job) {
      const error = appError.create("Invalid job ID", 400, httpStatusText.FAIL);
      throw error;
    }

    validateAnswers(job.Questions as TQuestion[], data.answers as TAnswer[]);

    data.jobId = job.id;

    const application = (
      await Application.create(data, { transaction })
    ).toJSON();

    await addApplicationAnswers(
      data.answers!,
      data.userId!,
      application.id,
      transaction
    );

    await transaction.commit();
    return application;
  } catch (error) {
    await transaction.rollback();
    throw handleSequelizeError(error);
  }
};

export default {
  getApplicationsService,
  getApplicationByIdService,
  createApplicationService,
};
