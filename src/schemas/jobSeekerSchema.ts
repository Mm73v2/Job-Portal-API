import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";
import minMaxValidation from "../utils/validationUtils/minMaxValidation";
import numberValidation from "../utils/validationUtils/numberValidation";

const jobSeekerSchema = z.object({
  userId: requiredString("User ID").uuid().optional(),
  firstName: minMaxValidation("First name", 1, 20),
  lastName: minMaxValidation("Last name", 1, 20),
  gender: z.enum(["male", "female"]),
  age: numberValidation("Age", "Age must be a valid number"), // Assuming age cannot be negative
  resume: requiredString("Resume").url(), // Assuming resume is a URL and optional
});

type TJobSeeker = z.infer<typeof jobSeekerSchema>;

export { jobSeekerSchema, TJobSeeker };
