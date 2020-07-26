import express from 'express';
import * as controller from '../controllers/event.controller';

export const EventRouter = express.Router();

EventRouter.route('/').post(controller.createEvent);
EventRouter.route('/').get(controller.readMultipleEvents);
EventRouter.route('/:eventID').get(controller.readEvent);
EventRouter.route('/:eventID').post(controller.updateEvent);
EventRouter.route('/:eventID').delete(controller.deleteEvent);
