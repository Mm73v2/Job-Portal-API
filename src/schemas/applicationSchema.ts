import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";
import answerSchema, { TAnswer } from "./answerSchema";
import jobsServices from "../services/jobsServices";
import { TQuestion } from "./questionSchema";
import appError from "../utils/errorsUtils/appError";
import httpStatusText from "../utils/httpStatusText";

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

const applicationSchema = z.object({
  id: z.number().int().positive().optional(),
  uuid: z.string().uuid().optional(),
  jobId: requiredString("jobId"),
  userId: requiredString("userId").optional(),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  answers: z.array(answerSchema).optional(),
});

export type TApplication = z.infer<typeof applicationSchema>;

export default applicationSchema;
