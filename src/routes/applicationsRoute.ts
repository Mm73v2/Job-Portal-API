import { Router } from "express";
// import {applicationsController} from '../controllers/applicationsController';

const applicationRouter = Router();

applicationRouter.route("/").get();
// applicationRouter.route('/').post('/', applicationsController.store);
// applicationRouter.route('/').get('/:id', applicationsController.show);
// applicationRouter.route('/').put('/:id', applicationsController.update);
// applicationRouter.route('/').delete('/:id', applicationsController.delete);

export default applicationRouter;
