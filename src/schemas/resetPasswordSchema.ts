import { z } from "zod";
import numberValidation from "../utils/validationUtils/numberValidation";
import requiredString from "../utils/validationUtils/requiredStringValidation";

const resetPasswordSchema = z.object({
  email: requiredString("Email").email("Invalid email address"),
  otp: numberValidation("otp", "Otp code must be a valid number"),
  newPassword: requiredString("Password")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 special character"
    ),
});

export default resetPasswordSchema;
