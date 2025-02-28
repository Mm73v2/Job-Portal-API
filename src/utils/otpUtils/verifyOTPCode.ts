import redisUtils from "../redisUtils";
import appError from "../errorsUtils/appError";
import httpStatusText from "../httpStatusText";
import compareResource from "../hashUtils/compareResource";

const verifyOTPCode = async (userId: string, otp: string) => {
  try {
    const hashedOtp = await redisUtils.get(userId);
    if (!hashedOtp) {
      const error = appError.create(
        "OTP code has expired or the account has been verified, please try to login or sign up",
        400,
        httpStatusText.FAIL
      );
      throw error;
    }

    const isMatchedOtp = compareResource(otp, hashedOtp);
    if (isMatchedOtp) {
      redisUtils.delete(userId);
    } else {
      const error = appError.create(
        "Invalid OTP or account already verified",
        400,
        httpStatusText.FAIL
      );
      throw error;
    }

    return isMatchedOtp;
  } catch (error) {
    throw error;
  }
};

export default verifyOTPCode;
