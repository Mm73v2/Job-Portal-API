import { z } from "zod";

const applicationSchema = z.object({
  id: z.number().int().positive().optional(),
  uuid: z.string().uuid().optional(),
  jobId: z.number().int().positive(),
  userId: z.number().int().positive(),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export type TApplication = z.infer<typeof applicationSchema>;

export default applicationSchema;
