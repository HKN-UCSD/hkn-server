import express from 'express';
import * as controller from '../controllers/induction-class.controller';

export const InductionClassRouter = express.Router();

InductionClassRouter.route('/').post(controller.createInductionClass);
