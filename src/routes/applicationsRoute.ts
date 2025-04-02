import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import {
  createApplication,
  getAllApplications,
  getApplication,
} from "../controllers/applicationsController";
import { validateRequest } from "../middlewares/validateRequest";
import applicationSchema from "../schemas/applicationSchema";
import isAllowed from "../middlewares/isAllowed";
import userRoles from "../utils/userRoles";

const applicationRouter = Router();

applicationRouter.route("/").get(verifyToken, getAllApplications);
//
applicationRouter
  .route("/")
  .post(
    verifyToken,
    isAllowed(userRoles.JOB_SEEKER),
    validateRequest(applicationSchema),
    createApplication
  );
applicationRouter
  .route("/:applicationId")
  .get(verifyToken, isAllowed(userRoles.JOB_PROVIDER), getApplication);
// applicationRouter.route('/').put('/:id', applicationsController.update);
// applicationRouter.route('/').delete('/:id', applicationsController.delete);

export default applicationRouter;
