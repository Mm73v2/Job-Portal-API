import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import {
  createApplication,
  getAllApplications,
} from "../controllers/applicationsController";
import { validateRequest } from "../middlewares/validateRequest";
import applicationSchema from "../schemas/applicationSchema";
import isAllowed from "../middlewares/isAllowed";

const applicationRouter = Router();

applicationRouter.route("/").get(verifyToken, getAllApplications);
//
applicationRouter
  .route("/")
  .post(
    verifyToken,
    isAllowed("jobSeeker"),
    validateRequest(applicationSchema),
    createApplication
  );
// applicationRouter.route('/').get('/:id', applicationsController.show);
// applicationRouter.route('/').put('/:id', applicationsController.update);
// applicationRouter.route('/').delete('/:id', applicationsController.delete);

export default applicationRouter;
