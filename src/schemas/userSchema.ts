import { z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";
import numberValidation from "../utils/validationUtils/numberValidation";
import minMaxValidation from "../utils/validationUtils/minMaxValidation";
import { jobSeekerSchema } from "./jobSeekerSchema";
import { jobProviderSchema } from "./jobProviderSchema";

// Define the Zod schema for User
const UserSchema = z.object({
  id: z.number().int().positive().optional(),
  uuid: z.string().uuid().optional(),
  email: requiredString("Email").email("Invalid email address"),
  password: requiredString("Password")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 special character"
    ),
  avatar: z.string().url().optional(),
  phoneNumber: requiredString("Phone number")
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number must be most least 15 digits long"),
  roleId: numberValidation("Role ID", "Invalid role ID"),
  country: minMaxValidation("Country", 2, 25),
  city: minMaxValidation("City", 2, 25),
  verified: z.boolean().default(false),
  deletedAt: z.date().nullable().optional(),
});

const combinedJobSeekerSchema = UserSchema.merge(jobSeekerSchema);
const combinedJobProviderSchema = UserSchema.merge(jobProviderSchema);
type TJobSeeker = z.infer<typeof combinedJobSeekerSchema>;
type TJobProvider = z.infer<typeof combinedJobProviderSchema>;

type TCombinedUser = TJobSeeker | TJobProvider;

type TUser = z.infer<typeof UserSchema>;

export {
  UserSchema,
  combinedJobSeekerSchema,
  combinedJobProviderSchema,
  TJobSeeker,
  TJobProvider,
  TCombinedUser,
  TUser,
};
