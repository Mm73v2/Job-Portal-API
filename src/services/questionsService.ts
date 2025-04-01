import { Question } from "../models";
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
      return questions;
    }

    const question = await Question.create(customQuestions[0]);
    return question;
  } catch (error) {
    console.log(error);
    handleSequelizeError(error);
  }
};

export default { createQuestionService };
