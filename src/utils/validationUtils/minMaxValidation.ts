import requiredString from "./requiredStringValidation";

const minMaxValidation = (field: string, min: number, max: number) => {
  return requiredString(field)
    .min(min, `${field} must be at least ${min} characters long`)
    .max(max, `${field} must be at most ${max} characters long`);
};

export default minMaxValidation;
