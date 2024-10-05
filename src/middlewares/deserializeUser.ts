import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { User } from "../models/user.model";

export interface IUser extends User {
  _id: string;
}

export interface ResponseLocals<T> extends Response {
  locals: {
    user?: T;
  };
}

async function deserializeUser(
  req: Request,
  res: ResponseLocals<IUser>,
  next: NextFunction
) {
  const accessToken = (req.headers.authorization ?? "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt<IUser>(accessToken, "accessTokenPrivateKey");

  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
}

export default deserializeUser;
