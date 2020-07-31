import express from 'express';
import * as controller from '../controllers/InductionClassController';

export const InductionClassRouter = express.Router();

InductionClassRouter.route('/').post(controller.createInductionClass);
