import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";

const questionSchema = z
  .object({
    type: z.enum(["standard", "custom"]),
    id: z.number().int().positive().optional(),
    uuid: z.string().uuid().optional(),
    questionBody: requiredString("Question body").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "standard") {
      ctx.addIssue({
        path: ["id"],
        message: "Question ID is requried for standard questions",
        code: "custom",
      });
    } else {
      ctx.addIssue({
        path: ["questionBody"],
        message: "Question body is requried for custom questions",
        code: "custom",
      });
    }
  });

export default questionSchema;
