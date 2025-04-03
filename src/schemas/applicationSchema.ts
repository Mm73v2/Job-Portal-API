import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";
import answerSchema from "./answerSchema";

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
