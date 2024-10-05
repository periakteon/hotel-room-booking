import { Request, Response, NextFunction } from "express";

function requireUser(_req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).send({ error: "Unauthorized" });
  }

  return next();
}

export default requireUser;
