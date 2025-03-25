import requiredString from "./requiredStringValidation";

const numberValidation = (field: string, message: string) => {
  return requiredString(field)
    .refine((val) => !isNaN(Number(val)), { message }) // Ensure it's a valid number
    .transform((val) => Number(val));
};

export default numberValidation;
