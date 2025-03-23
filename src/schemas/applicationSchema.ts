import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";

const applicationSchema = z.object({
  id: z.number().int().positive().optional(),
  uuid: z.string().uuid().optional(),
  jobId: requiredString("jobId"),
  userId: requiredString("userId"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export type TApplication = z.infer<typeof applicationSchema>;

export default applicationSchema;
