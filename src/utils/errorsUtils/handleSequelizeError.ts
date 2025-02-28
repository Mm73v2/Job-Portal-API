import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} from "sequelize";
import httpStatusText from "../httpStatusText";
import appError, { AppError, TAppError } from "./appError";

const handleSequelizeError = (
  error: unknown
): { message: string; statusCode: number } => {
  let message = "An unexpected error occurred.";
  let statusCode = 500;
  let statusText = httpStatusText.ERROR;

  if (error instanceof ValidationError) {
    // Handle validation errors
    message = error.errors
      .map((err) => {
        return `Field "${err.path}" is invalid: ${err.message}`;
      })
      .join(", ");
    statusCode = 400; // Bad Request
    statusText = httpStatusText.FAIL;
  } else if (error instanceof UniqueConstraintError) {
    // Handle unique constraint errors
    message = error.errors
      .map((err) => {
        return `Field "${err.path}" must be unique.`;
      })
      .join(", ");
    statusCode = 409; // Conflict
    statusText = httpStatusText.FAIL;
  } else if (error instanceof ForeignKeyConstraintError) {
    // Handle foreign key constraint errors
    message = `Foreign key constraint failed: ${error.message}`;
    statusCode = 400; // Bad Request
    statusText = httpStatusText.FAIL;
  } else if (error instanceof DatabaseError) {
    // Handle generic database errors
    message = `Database error: ${error.message}`;
    statusCode = 400; // Bad Request
    statusText = httpStatusText.ERROR;
  } else if (error instanceof AppError) {
    // Handle generic errors
    return error;
  } else if (error instanceof Error) {
    message = error.message;
  }
  const sqlError = appError.create(message, statusCode, statusText);
  return sqlError;
};

export default handleSequelizeError;
