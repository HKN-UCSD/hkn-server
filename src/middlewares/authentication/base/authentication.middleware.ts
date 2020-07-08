import { Request, Response, NextFunction } from 'express';
import { verifyRole } from '../../../services/auth.service';

const AuthMiddleware = (permittedRoles: Array<string>) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.body;

  await verifyRole(token, permittedRoles, next);
};

export default AuthMiddleware;
