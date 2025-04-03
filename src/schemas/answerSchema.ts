import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";

const answerSchema = z.object({
  id: z.number().int().positive().optional(),
  uuid: z.string().uuid().optional(),
  questionId: z.number().int().positive(),
  answerBody: requiredString("answerBody").min(1).max(1000),
});

export type TAnswer = z.infer<typeof answerSchema>;
export default answerSchema;
