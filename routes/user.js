import express from 'express';
const UserRouter = express.Router();

import User from '../models/user.js';
import * as controller from '../controllers/user.js';

UserRouter.route('/:uid/add-role').post(controller.addRole);
UserRouter.route('/:uid/add-claim').post(controller.addClaim);
UserRouter.route('/:uid/remove-claim').post(controller.removeClaim);
UserRouter.route('/:uid/view-claim').post(controller.viewClaim);
UserRouter.route('/:uid/update-claim').post(controller.updateClaim);

export default UserRouter;
