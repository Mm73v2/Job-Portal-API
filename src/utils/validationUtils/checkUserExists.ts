import appError from "../errorsUtils/appError";
import httpStatusText from "../httpStatusText";

const checkUserExists = (user: any) => {
  if (!user) {
    const error = appError.create(
      "Invalid user ID",
      404,
      httpStatusText.NOT_FOUND
    );
    throw error;
  }
  return true;
};

export default checkUserExists;
