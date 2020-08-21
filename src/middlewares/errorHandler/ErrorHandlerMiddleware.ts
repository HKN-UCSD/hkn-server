import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const ErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send({ err });
};

export default ErrorHandler;
