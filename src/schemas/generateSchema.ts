import { ZodType, z } from "zod";
import requiredString from "../utils/validationUtils/requiredStringValidation";
import numberValidation from "../utils/validationUtils/numberValidation";

type TGeneratedSchema = {
  fieldName: string;
  fieldType?: "email" | "number";
  message?: string;
};

const generateSchema = (...fields: TGeneratedSchema[]) => {
  const generatedSchema: { [key: string]: ZodType } = {};

  fields.forEach((field) => {
    if (field.fieldType === "email") {
      return (generatedSchema[field.fieldName] = requiredString(
        field.fieldName
      ).email("Invalid email address"));
    } else if (field.fieldType === "number") {
      return (generatedSchema[field.fieldName] = numberValidation(
        field.fieldName,
        field.message
          ? field.message
          : `${field.fieldName} must be a valid number`
      ));
    } else {
      generatedSchema[field.fieldName] = requiredString(field.fieldName);
    }
  });

  const schema = z.object(generatedSchema);
  return schema;
};

export default generateSchema;
