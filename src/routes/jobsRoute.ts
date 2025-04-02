import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import jobSchema from "../schemas/jobSchema";
import {
  createJob,
  getAllJobs,
  getJob,
  getQuestions,
} from "../controllers/jobsController";
import verifyToken from "../middlewares/verifyToken";
import isAllowed from "../middlewares/isAllowed";
import userRoles from "../utils/userRoles";

const jobsRouter = Router();

jobsRouter.route("/").get(getAllJobs);

jobsRouter
  .route("/questions")
  .get(verifyToken, isAllowed(userRoles.JOB_PROVIDER), getQuestions);

jobsRouter.route("/:jobId").get(getJob);

jobsRouter
  .route("/")
  .post(
    verifyToken,
    isAllowed(userRoles.JOB_PROVIDER),
    validateRequest(jobSchema),
    createJob
  );

export default jobsRouter;
