import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";

export const questionTypeEnum = z.enum(["standard", "custom"], {
  required_error: "Question type is required",
  invalid_type_error:
    "Invalid question type selected. Allowed values: standard, custom",
});

const questionSchema = z
  .object({
    id: z.number().int().positive().optional(),
    uuid: z.string().uuid().optional(),
    questionId: z.string().uuid().optional(),
    type: questionTypeEnum,
    questionBody: requiredString("Question body").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "standard" && !data.questionId) {
      ctx.addIssue({
        path: ["questionId"],
        message: "Question ID is requried for standard questions",
        code: "custom",
      });
    } else if (
      data.type === "custom" &&
      (!data.questionBody || data.questionBody.trim() === "")
    ) {
      ctx.addIssue({
        path: ["questionBody"],
        message: "Question body is requried for custom questions",
        code: "custom",
      });
    }
  });

export type TQuestion = z.infer<typeof questionSchema>;
export default questionSchema;
