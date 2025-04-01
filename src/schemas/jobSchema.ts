import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";
import numberValidation from "../utils/validationUtils/numberValidation";
import questionSchema from "./questionSchema";

const TypeEnum = z.enum(["onsite", "remotely", "hybrid"]);
const StatusEnum = z.enum(["open", "closed"]);
const jobSchema = z.object({
  id: z.number().int().positive().optional(),
  uuid: z.string().uuid().optional(),
  title: requiredString("Title"),
  description: requiredString("Description"),
  jobProviderId: numberValidation(
    "Job provider ID",
    "Job provider ID must be a valid number"
  ).optional(),
  type: TypeEnum.refine((value) => TypeEnum.options.includes(value), {
    message: "Invalid type selected. Allowed values: onsite, remotely, hybrid",
  }),
  location: requiredString("Location"),
  salary: numberValidation(
    "Salary",
    "Salary must be a valid positive number"
  ).optional(),
  status: StatusEnum.default("open").refine(
    (value) => StatusEnum.options.includes(value),
    {
      message: "Invalid status selected. Allowed values: open, closed",
    }
  ),
  questions: z
    .array(questionSchema)
    .max(3, "You can't add more than 3 questions for the job")
    .optional(),
});

export type TJob = z.infer<typeof jobSchema>;
export default jobSchema;
