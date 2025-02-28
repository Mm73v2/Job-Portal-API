import hashResource from "../hashUtils/hashResource";
import redisUtils from "../redisUtils";
import generateOTP from "./generateOTP";

const storeOTP = async (userId: string): Promise<string> => {
  const otp = generateOTP();
  const hashedOTP = hashResource(otp);
  await redisUtils.set(userId, hashedOTP, 1800);
  return otp;
};

export default storeOTP;
