import appError from "../errorsUtils/appError";
import httpStatusText from "../httpStatusText";

const checkUserExists = (user: any, message: string = "Invalid user ID") => {
  if (!user) {
    const error = appError.create(message, 404, httpStatusText.NOT_FOUND);
    throw error;
  }
  return true;
};

export default checkUserExists;
