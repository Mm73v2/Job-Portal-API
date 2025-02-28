import { z } from "zod";

const requiredString = (fieldName: string) => {
  return z
    .string({
      required_error: `${fieldName} is required`, // Automatically generate the message
    })
    .min(1, `${fieldName} cannot be empty`);
};

export default requiredString;
