import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import { signJwt } from "../utils/jwt";
import SessionModel from "../models/session.model";
import { User } from "../models/user.model";

export async function createSession({ user }: { user: DocumentType<User> }) {
  return SessionModel.create({ user });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), ["password", "__v"]);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });

  return accessToken;
}

export async function signRefreshToken({ user }: { user: DocumentType<User> }) {
  const session = await createSession({
    user,
  });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  session.refreshToken = refreshToken;
  await session.save();

  return {
    sessionId: session._id,
    refreshToken,
  };
}
