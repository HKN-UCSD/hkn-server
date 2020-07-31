import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { InductionClass } from '@Entities';

export const createInductionClass = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inductionClass: InductionClass = plainToClass(
      InductionClass,
      req.body
    );
    const inductionClassWithID = await inductionClass.save();
    res.status(200).json(inductionClassWithID);
  } catch (err) {
    next(err);
  }
};
