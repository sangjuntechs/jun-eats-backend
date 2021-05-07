import { NextFunction, Request, Response } from 'express';

export function jwtMiddleWare(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers);
  next();
}
