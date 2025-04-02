import { Transaction } from "sequelize";
import { JobQuestion, Question } from "../models";
import { TQuestion } from "../schemas/questionSchema";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";

const createQuestionService = async (
  data: TQuestion[],
  transaction: Transaction
) => {
  try {
    if (data.length > 1) {
      const questions = await Question.bulkCreate(data, {
        validate: true,
        ignoreDuplicates: false,
        transaction,
      });
      const parsedQuestions = questions.map((question) => question.toJSON());
      return parsedQuestions;
    }

    const question = (await Question.create(data[0], { transaction })).toJSON();
    return question;
  } catch (error) {
    handleSequelizeError(error);
  }
};

const createJobQuestionService = async (
  data: {
    jobId: number;
    questionId: number;
  }[],
  transaction: Transaction
) => {
  try {
    if (data.length > 1) {
      const jobQuestions = await JobQuestion.bulkCreate(data, { transaction });
      const parsedJobQuestions = jobQuestions.map((jobQuestion) =>
        jobQuestion.toJSON()
      );
      return parsedJobQuestions;
    } else {
      const jobQuestion = (
        await JobQuestion.create(data[0], { transaction })
      ).toJSON();
      return jobQuestion;
    }
  } catch (error) {
    handleSequelizeError(error);
  }
};

export default { createQuestionService, createJobQuestionService };
