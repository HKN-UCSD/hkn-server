import express from 'express';
import * as controller from '../controllers/auth.controller';

export const AuthRouter = express.Router();

/**
 * @swagger
 * /signup:
 *  post:
 *    description: create an user auth account.
 */
AuthRouter.route('/signup').post(controller.signup);