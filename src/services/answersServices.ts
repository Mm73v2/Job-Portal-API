import { Transaction } from "sequelize";
import { Answer, ApplicationAnswer } from "../models";
import { TAnswer } from "../schemas/answerSchema";

const createAnswerService = async (data: TAnswer, transaction: Transaction) => {
  const answer = (await Answer.create(data, { transaction })).toJSON();
  return answer;
};

const createApplicationAnswerService = async (
  data: TAnswer,
  transaction: Transaction
) => {
  const applicationAnswer = (
    await ApplicationAnswer.create(data, { transaction })
  ).toJSON();
  return applicationAnswer;
};

export default {
  createAnswerService,
  createApplicationAnswerService,
};
