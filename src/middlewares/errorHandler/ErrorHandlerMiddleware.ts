import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const ErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({ err });
};

export default ErrorHandler;
