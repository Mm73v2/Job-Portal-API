import { Question } from "../models";

const createQuestionService = async (data: {
  type: string;
  questionBody: string;
}) => {
  const question = (await Question.create(data)).toJSON();
  return question;
};

export default { createQuestionService };
