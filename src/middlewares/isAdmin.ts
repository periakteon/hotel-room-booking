import { Request, NextFunction } from "express";
import { IUser, ResponseLocals } from "./deserializeUser";

function assertAdmin(
  req: Request,
  res: ResponseLocals<IUser>,
  next: NextFunction
) {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  if (user.role !== "admin") {
    return res.sendStatus(403);
  }

  return next();
}

export default assertAdmin;
