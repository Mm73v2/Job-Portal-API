import { Router } from "express";
import {
  changeEmail,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/usersController";
import { validateRequest } from "../middlewares/validateRequest";
import { jobSeekerSchema } from "../schemas/jobSeekerSchema";
import {
  combinedJobProviderSchema,
  combinedJobSeekerSchema,
} from "../schemas/userSchema";
import upload from "../config/cloudinaryConfig";
import generateSchema from "../schemas/generateSchema";

const usersRouter = Router();

// Get all users
usersRouter.route("/").get(getAllUsers);

// Get user by ID
usersRouter.route("/:userId").get(getUserById);

// Change user email
// TODO modify the generate schema for other things than string
const changeEmailSchema = generateSchema({
  fieldName: "newEmail",
  fieldType: "email",
});
usersRouter
  .route("/:userId/change-email")
  .post(validateRequest(changeEmailSchema), changeEmail);

// Update job seekers and job providers
usersRouter.route("/:userId/job-seeker").put(
  upload.single("image"),
  validateRequest(
    combinedJobSeekerSchema
      .omit({
        roleId: true,
        gender: true,
        email: true,
        password: true,
      })
      .partial()
  ),
  updateUser
);

usersRouter.route("/:userId/job-provider").put(
  upload.single("image"),
  validateRequest(
    combinedJobProviderSchema
      .omit({
        roleId: true,
        email: true,
        password: true,
      })
      .partial()
  ),
  updateUser
);

// Delete user by ID
usersRouter.route("/:userId").delete(deleteUser);

export default usersRouter;
