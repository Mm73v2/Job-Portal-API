import { z } from "zod";
import minMaxValidation from "../utils/validationUtils/minMaxValidation";
import numberValidation from "../utils/validationUtils/numberValidation";

const jobProviderSchema = z.object({
  userId: numberValidation(
    "User ID",
    "Invalid user ID for the job seeker table"
  ).optional(),
  companyName: minMaxValidation("Company name", 2, 50),
  establishedAt: z.coerce.date({
    required_error: "Established at is required",
    invalid_type_error: "Established at must be in date format",
  }),
});

type TJobSeeker = z.infer<typeof jobProviderSchema>;

export { jobProviderSchema, TJobSeeker };
