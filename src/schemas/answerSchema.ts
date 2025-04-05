import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";
import { questionTypeEnum } from "./questionSchema";
import minMaxValidation from "../utils/validationUtils/minMaxValidation";

const answerSchema = z
  .object({
    id: z.number().int().positive().optional(),
    uuid: z.string().uuid().optional(),
    userId: z.string().optional(),
    applicationId: z.string().optional(),
    answerId: requiredString("answerId").optional(),
    questionId: requiredString("questionId").optional(),
    questionType: questionTypeEnum.optional(),
    answerBody: minMaxValidation("answerBody", 1, 1000).optional(),
    save: z.boolean().default(false),
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

      if (data.questionType === "custom" && data.answerId) {
        ctx.addIssue({
          path: ["answerId"],
          message: "Answer ID cannot be provided for custom questions",
          code: "custom",
        });
      }

      if (data.questionType === "custom" && data.save) {
        ctx.addIssue({
          path: ["save"],
          message: "Save cannot be true for custom questions",
          code: "custom",
        });
      }
    }
  });

export type TAnswer = z.infer<typeof answerSchema>;
export default answerSchema;
