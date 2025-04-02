import { JobQuestion, Question } from "../models";
import { TQuestion } from "../schemas/questionSchema";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";

const createQuestionService = async (data: TQuestion[]) => {
  try {
    if (data.length > 1) {
      const questions = await Question.bulkCreate(data, {
        validate: true,
        ignoreDuplicates: false,
      });
      const parsedQuestions = questions.map((question) => question.toJSON());
      return parsedQuestions;
    }

    const question = (await Question.create(data[0])).toJSON();
    return question;
  } catch (error) {
    handleSequelizeError(error);
  }
};

const createJobQuestionService = async (
  data: {
    jobId: number;
    questionId: number;
  }[]
) => {
  try {
    if (data.length > 1) {
      const jobQuestions = await JobQuestion.bulkCreate(data);
      const parsedJobQuestions = jobQuestions.map((jobQuestion) =>
        jobQuestion.toJSON()
      );
      return parsedJobQuestions;
    } else {
      const jobQuestion = (await JobQuestion.create(data[0])).toJSON();
      return jobQuestion;
    }
  } catch (error) {
    handleSequelizeError(error);
  }
};

export default { createQuestionService, createJobQuestionService };
