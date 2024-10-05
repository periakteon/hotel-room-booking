import { Request, NextFunction } from "express";
import { IUser, ResponseLocals } from "./deserializeUser";

function assertAdmin(
  req: Request,
  res: ResponseLocals<IUser>,
  next: NextFunction
) {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).send({ error: "Unauthorized" });
  }

  if (user.role !== "admin") {
    return res
      .status(403)
      .send({ error: "Only admins can edit this resource" });
  }

  return next();
}

export default assertAdmin;
