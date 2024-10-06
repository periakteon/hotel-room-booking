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
  const getToken = (): string | null => {
    const authHeaderToken = req.headers.authorization?.replace(/^Bearer\s/, "");
    const cookieToken = req.cookies["accessToken"];
    return (authHeaderToken || cookieToken) ?? null;
  };

  const token = getToken();

  if (!token) {
    return next();
  }

  const decoded = verifyJwt<IUser>(token, "accessTokenPrivateKey");

  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
}

export default deserializeUser;
