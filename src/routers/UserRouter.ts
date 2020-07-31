import express from 'express';
import * as controller from '../controllers/UserController';

export const UserRouter = express.Router();

UserRouter.route('/').post(controller.createUser);

/**
 * @swagger
 * /:uid/add-role:
 *  post:
 *    description: add role to user
 */
UserRouter.route('/:uid/add-role').post(controller.addRole);
UserRouter.route('/:uid/add-claim').post(controller.addClaim);
UserRouter.route('/:uid/remove-claim').post(controller.removeClaim);
UserRouter.route('/:uid/view-claim').get(controller.viewClaim);
UserRouter.route('/:uid/update-claim').post(controller.updateClaim);
