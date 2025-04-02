import { JobQuestion, Question } from "../models";
import { TQuestion } from "../schemas/questionSchema";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";

const createQuestionService = async (data: TQuestion[]) => {
  try {
    // only adding the custom questions
    const customQuestions = data.filter(
      (question) => question.type !== "standard"
    );
    if (customQuestions.length === 0) return;
    if (customQuestions.length > 1) {
      const questions = await Question.bulkCreate(customQuestions, {
        validate: true,
        ignoreDuplicates: false,
      });
      const parsedQuestions = questions.map((question) => question.toJSON());
      return parsedQuestions;
    }

    const question = (await Question.create(customQuestions[0])).toJSON();
    return question;
  } catch (error) {
    handleSequelizeError(error);
  }
};

const createJobQuestionService = async (data: {
  jobId: number;
  questions: TQuestion | TQuestion[];
}) => {
  try {
    const { jobId, questions } = data;
    if (Array.isArray(questions)) {
      const jobQuestionsData = questions.map((question) => ({
        jobId,
        questionId: question.id,
      }));
      const jobQuestions = await JobQuestion.bulkCreate(jobQuestionsData);
      const parsedJobQuestions = jobQuestions.map((jobQuestion) =>
        jobQuestion.toJSON()
      );
      return parsedJobQuestions;
    } else {
      const jobQuestionData = { jobId, questionId: questions.id };
      const jobQuestion = (await JobQuestion.create(jobQuestionData)).toJSON();
      return jobQuestion;
    }
  } catch (error) {
    handleSequelizeError(error);
  }
};

export default { createQuestionService, createJobQuestionService };
