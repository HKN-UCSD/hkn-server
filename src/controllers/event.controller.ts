import { Request, Response, NextFunction } from 'express';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Event } from '../entities/Event';
import { castID } from './utils';

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const event: Event = plainToClass(Event, req.body);
    const eventWithID = await event.save();
    res.status(200).json(eventWithID);
  } catch (err) {
    next(err);
  }
};

export const readEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventID } = req.params;
    const eventIDNum = castID(eventID);

    const event = await Event.findOne({ id: eventIDNum });
    if (event === undefined) {
      throw new Error('No event with given id found.');
    }

    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

// TODO add query params for date later
export const readMultipleEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events: Event[] = await Event.find({});
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventID } = req.params;
    // TODO wrap next 4 lines into function as it'll be used across all entities
    const eventIDNum = castID(eventID);

    const event = await Event.findOne({ id: eventIDNum });
    if (event === undefined) {
      throw new Error('No event with given id found.');
    }

    const updatedEvent = plainToClassFromExist(event, req.body);
    await updatedEvent.save();
    res.status(200).json(updatedEvent);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventID } = req.params;
    const eventIDNum = castID(eventID);

    const event = await Event.findOne({ id: eventIDNum });
    if (event === undefined) {
      throw new Error('No event with given id found.');
    }

    await Event.delete(event);
    res.status(200);
  } catch (err) {
    next(err);
  }
};
