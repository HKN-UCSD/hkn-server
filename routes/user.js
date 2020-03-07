import express from 'express';
const UserRouter = express.Router();

import User from '../models/user.js';
import * as controller from '../controllers/user.js';

UserRouter.route('/:uid/add-claim').post(controller.addClaim);

export default UserRouter;
