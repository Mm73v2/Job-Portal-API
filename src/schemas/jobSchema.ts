import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";
import numberValidation from "../utils/validationUtils/numberValidation";
import questionSchema from "./questionSchema";

const TypeEnum = z.enum(["onsite", "remotely", "hybrid"], {
  required_error: "Job type is required",
  invalid_type_error:
    "Invalid job type selected. Allowed values: onsite, remotely, hybrid",
});

const StatusEnum = z.enum(["open", "closed"], {
  required_error: "Job status is required",
  invalid_type_error:
    "Invalid job status selected. Allowed values: open, closed",
});

const jobSchema = z.object({
  id: z.number().int().positive().optional(),
  uuid: z.string().uuid().optional(),
  title: requiredString("Title"),
  description: requiredString("Description"),
  jobProviderId: z.number().int().positive().optional(),
  type: TypeEnum,
  location: requiredString("Location"),
  salary: numberValidation(
    "Salary",
    "Salary must be a valid positive number"
  ).optional(),
  status: StatusEnum,
  questions: z
    .array(questionSchema)
    .min(
      1,
      "You can't send an empty questions array, you can create the job without it, or add questions to it"
    )
    .max(3, "You can't add more than 3 questions for the job")
    .optional(),
});

export type TJob = z.infer<typeof jobSchema>;
export default jobSchema;
