/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            IMPORTANT
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

This file is awaiting refactoring. Please ignore.
You're getting moved into a routing-controller.
*/

import express from 'express';
import * as controller from '../controllers/OldAuthController';

export const AuthRouter = express.Router();

/**
 * @swagger
 * /signup:
 *  post:
 *    description: create an user auth account.
 */
AuthRouter.route('/signup').post(controller.signup);
