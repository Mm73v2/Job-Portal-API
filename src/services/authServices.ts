import { JobProvider, JobSeeker, Role, User } from "../models";
import { TJobProvider, TJobSeeker } from "../schemas/userSchema";
import appError from "../utils/errorsUtils/appError";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";
import httpStatusText from "../utils/httpStatusText";
import checkUserExists from "../utils/validationUtils/checkUserExists";

const getRoleByIdService = async (roleId: number) => {
  const role = (await Role.findByPk(roleId))?.toJSON();
  return role;
};

const registerJobSeekerService = async (data: TJobSeeker) => {
  try {
    const {
      email,
      password,
      country,
      city,
      avatar,
      phoneNumber,
      roleId,
      firstName,
      lastName,
      age,
      gender,
      resume,
    } = data;

    const userData = {
      email,
      password,
      country,
      city,
      avatar,
      phoneNumber,
      roleId,
    };

    const user = await User.create(userData);
    if (user) {
      const jobSeekerData = {
        userId: user.dataValues.id,
        firstName,
        lastName,
        age,
        gender,
        resume,
      };
      const jobSeeker = await JobSeeker.create(jobSeekerData);
      const fullUser = { ...user.toJSON(), ...jobSeeker.toJSON() };

      return fullUser;
    }
  } catch (error: unknown) {
    throw handleSequelizeError(error);
  }
};

const registerJobProviderService = async (data: TJobProvider) => {
  try {
    const {
      email,
      password,
      country,
      city,
      avatar,
      phoneNumber,
      companyName,
      establishedAt,
      roleId,
    } = data;

    const userData = {
      email,
      password,
      country,
      city,
      avatar,
      phoneNumber,
      roleId,
    };

    const user = (await User.create(userData))?.toJSON();

    if (user) {
      const jobProviderData = {
        userId: user.id,
        companyName,
        establishedAt,
      };
      const jobProvider = (await JobProvider.create(jobProviderData))?.toJSON();
      const fullUser = { ...user, ...jobProvider };
      delete fullUser.password;
      return fullUser;
    }
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

const loginService = async (email: string) => {
  try {
    const user = (
      await User.findOne({
        where: { email },
        include: [{ model: Role, attributes: ["role"] }],
        // attributes: ["id", "password", "verified", "uuid"],
      })
    )?.toJSON();

    checkUserExists(user, "Invalid credentials");
    if (!user!.verified) {
      const error = appError.create(
        "Please verify your email first then try to login again",
        400,
        httpStatusText.FAIL
      );
      throw error;
    }
    return user!;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

const verifyUserService = async (userId: string) => {
  try {
    const user = await User.findOne({ where: { uuid: userId } });
    // Chcking if the user exists
    checkUserExists(user);
    user!.set("verified", true);
    await user!.save();
    return user!.dataValues;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

const resetPasswordService = async (email: string, newPassword: string) => {
  try {
    const user = await User.update(
      { password: newPassword },
      { where: { email } }
    );
    checkUserExists(user, "Invalid credentials");

    return user;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

export default {
  getRoleByIdService,
  registerJobSeekerService,
  registerJobProviderService,
  loginService,
  verifyUserService,
  resetPasswordService,
};
