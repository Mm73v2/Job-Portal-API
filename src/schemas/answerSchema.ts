import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";

const answerSchema = z
  .object({
    id: z.number().int().positive().optional(),
    uuid: z.string().uuid().optional(),
    answerId: requiredString("answerId").optional(),
    questionId: requiredString("questionId").optional(),
    answerBody: requiredString("answerBody").min(1).max(1000).optional(),
    save: z.boolean().default(false).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.answerId && data.answerBody) {
      ctx.addIssue({
        path: ["answerBody"],
        message: "Answer body cannot be provided when answerId is provided",
        code: "custom",
      });

      if (data.answerId && data.save) {
        ctx.addIssue({
          path: ["save"],
          message: "Save cannot be true when answerId is provided",
          code: "custom",
        });
      }
    }
  });

export type TAnswer = z.infer<typeof answerSchema>;
export default answerSchema;
