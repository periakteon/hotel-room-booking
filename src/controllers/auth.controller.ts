import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/auth.schema";
import { findUserByEmail, findUserById } from "../services/user.service";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../services/auth.service";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";

export async function createSessionHandler(
  req: Request<object, object, CreateSessionInput>,
  res: Response
) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send({ error: "User not found" });
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send({ error: "Invalid password" });
  }

  const accessToken = signAccessToken(user);

  const { refreshToken, sessionId } = await signRefreshToken({ user });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  res.header("Authorization", `Bearer ${accessToken}`);
  return res.send({
    accessToken,
    refreshToken,
    sessionId,
  });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, "headers.x-refresh");

  if (!refreshToken) {
    return res.status(401).send("Could not refresh access token");
  }

  const decoded = verifyJwt<{ session: string }>(
    refreshToken as string,
    "refreshTokenPrivateKey"
  );

  if (!decoded) {
    return res.status(401).send("Could not refresh access token");
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send("Could not refresh access token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send("Could not refresh access token");
  }

  const accessToken = signAccessToken(user);

  res.header("Authorization", `Bearer ${accessToken}`);
  return res.send({ accessToken });
}
