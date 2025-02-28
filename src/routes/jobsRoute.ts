import { Router } from "express";
import generateSchema from "../schemas/generateSchema";
import { validateRequest } from "../middlewares/validateRequest";
import jobSchema from "../schemas/jobSchema";
import { createJob, getAllJobs } from "../controllers/jobsController";
import verifyToken from "../middlewares/verifyToken";
import isAllowed from "../middlewares/isAllowed";
import userRoles from "../utils/userRoles";

const jobsRouter = Router();

jobsRouter.route("/").get(getAllJobs);

jobsRouter
  .route("/")
  .post(
    verifyToken,
    isAllowed(userRoles.JOB_PROVIDER),
    validateRequest(jobSchema),
    createJob
  );

export default jobsRouter;
