import { JobProvider, JobSeeker, Role } from "../models";
import User from "../models/UserModel";
import handleSequelizeError from "../utils/errorsUtils/handleSequelizeError";
import checkUserExists from "../utils/validationUtils/checkUserExists";
import { TCombinedUser } from "../schemas/userSchema";
import appError from "../utils/errorsUtils/appError";
import httpStatusText from "../utils/httpStatusText";
import paginationInfo from "../utils/pagination/paginationInfo";

const getAllUsersService = async (pagination: {
  limit: number;
  offset: number;
}) => {
  try {
    const { limit, offset } = pagination;
    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ["password", "deletedAt"] },
      include: [
        {
          model: JobProvider,
          attributes: { exclude: ["userId"] },
        },
        {
          model: JobSeeker,
          attributes: { exclude: ["userId"] },
        },
      ],
    });

    const paginationData = paginationInfo(count, rows.length, limit);

    return { paginationData, users: rows };
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

const getRoleService = async (userId: string) => {
  try {
    const role = (
      await User.findOne({
        where: { uuid: userId },
        attributes: [],
        include: [{ model: Role, attributes: ["role"] }],
      })
    )?.toJSON();
    checkUserExists(role);
    return role!.Role.role as "jobSeeker" | "jobProvider";
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

const findUserByIdOrEmailService = async (
  identifier: { userId?: string; email?: string },
  fields?: string[]
) => {
  try {
    const whereClause: { uuid?: string; email?: string } = {};

    if (identifier.userId) whereClause.uuid = identifier.userId;
    else if (identifier.email) whereClause.email = identifier.email;
    else
      throw appError.create(
        "Either userId or email must be provided.",
        400,
        httpStatusText.FAIL
      );

    const user = (
      await User.findOne({
        where: whereClause,
        attributes: fields
          ? fields
          : {
              exclude: ["password", "id", "deletedAt"],
            },
        include: [
          { model: JobSeeker, attributes: { exclude: ["userId"] } },
          { model: JobProvider, attributes: { exclude: ["userId"] } },
          { model: Role, attributes: ["role"] },
        ],
      })
    )?.toJSON();

    checkUserExists(user);
    if (!user.JobProvider) {
      delete user.JobProvider;
    } else if (!user.JobSeeker) {
      delete user.JobSeeker;
    }
    return user!;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

// const findUserByIdService = async (
//   userId: string,
//   options?: Partial<
//     TJobProvider &
//       TJobSeeker & {
//         email?: string;
//         phoneNumber?: string;
//         city?: string;
//         country?: string;
//       }
//   >
// ) => {
//   try {
//     const {
//       email,
//       phoneNumber,
//       city,
//       country,
//       firstName,
//       lastName,
//       age,
//       gender,
//       companyName,
//       establishedAt,
//     } = options || {};

//     let whereClause: any = { uuid: userId };

//     // Apply main User filters
//     if (email) whereClause.email = email;
//     if (phoneNumber) whereClause.phoneNumber = phoneNumber;
//     if (city) whereClause.city = city;
//     if (country) whereClause.country = country;

//     // Define include conditions dynamically
//     let includeOptions: any[] = [];

//     if (firstName || lastName || age || gender) {
//       includeOptions.push({
//         model: JobSeeker,
//         attributes: { exclude: ["userId"] },
//         where: {
//           ...(firstName && { firstName }),
//           ...(lastName && { lastName }),
//           ...(age && { age }),
//           ...(gender && { gender }),
//         },
//         required: !!(firstName || lastName || age || gender), // Ensures filtering works
//       });
//     } else {
//       includeOptions.push({
//         model: JobSeeker,
//         attributes: { exclude: ["userId"] },
//       });
//     }

//     if (companyName || establishedAt) {
//       includeOptions.push({
//         model: JobProvider,
//         attributes: { exclude: ["userId"] },
//         where: {
//           ...(companyName && { companyName }),
//           ...(establishedAt && { establishedAt }),
//         },
//         required: !!(companyName || establishedAt),
//       });
//     } else {
//       includeOptions.push({
//         model: JobProvider,
//         attributes: { exclude: ["userId"] },
//       });
//     }

//     // Fetch user with filters
//     let user = (
//       await User.findOne({
//         where: whereClause,
//         attributes: { exclude: ["password", "id", "deletedAt"] },
//         include: includeOptions,
//       })
//     )?.toJSON();

//     checkUserExists(user);

//     // Clean up empty associations
//     if (!user?.JobProvider) {
//       delete user?.JobProvider;
//     }
//     if (!user?.JobSeeker) {
//       delete user?.JobSeeker;
//     }

//     return user!;
//   } catch (error) {
//     throw handleSequelizeError(error);
//   }
// };

const updateUserService = async (userId: string, data: TCombinedUser) => {
  try {
    const userDbId = await findUserByIdOrEmailService({ userId }, ["id"]);
    checkUserExists(userDbId);

    const userRole = await getRoleService(userId);

    const { country, city, phoneNumber, ...roleData } = data;

    const userUpdate = await User.update(
      { country, city, phoneNumber },
      {
        where: { uuid: userId },
        returning: true,
      }
    );

    let roleUpdate;
    switch (userRole) {
      case "jobSeeker":
        roleUpdate = await JobSeeker.update(roleData, {
          where: { userId: userDbId.id },
        });
        break;
      case "jobProvider":
        roleUpdate = await JobProvider.update(roleData, {
          where: { userId: userDbId.id },
        });
        break;
    }

    const userData = await findUserByIdOrEmailService({ userId });
    return userData;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

const changeEmailService = async (userId: string, newEmail: string) => {
  try {
    const oldUserEmail = await findUserByIdOrEmailService({ userId }, [
      "email",
    ]);

    checkUserExists(oldUserEmail);
    if (oldUserEmail.email === newEmail) {
      const error = appError.create(
        "You have enterd your old email, please provide the new email address",
        400,
        httpStatusText.FAIL
      );
      throw error;
    }

    await User.update(
      { email: newEmail, verified: false },
      { where: { uuid: userId } }
    );

    const user = await findUserByIdOrEmailService({ userId });

    return user;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

const deleteUserService = async (userId: string) => {
  try {
    const deletedUser = await User.destroy({ where: { uuid: userId } });
    checkUserExists(deletedUser);
    return deletedUser;
  } catch (error) {
    throw handleSequelizeError(error);
  }
};

export default {
  getAllUsersService,
  findUserByIdOrEmailService,
  getRoleService,
  updateUserService,
  deleteUserService,
  changeEmailService,
};
