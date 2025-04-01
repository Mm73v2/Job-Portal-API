import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";

const questionSchema = z.object({
  id: z.number().int().positive().optional(),
  uuid: z.string().uuid().optional(),
  type: z.enum(["standard", "custom"]),
  questionBody: requiredString("Question body"),
});

export default questionSchema;
