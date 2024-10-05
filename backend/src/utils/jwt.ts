import jwt from "jsonwebtoken";
import { getEnvVar } from "./env";
import log from "./logger";

export function signJwt(
  object: object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const key = getEnvVar(keyName);

  const jwtKey = jwt.sign(object, key, {
    ...(options && options),
  });

  return jwtKey;
}

export function verifyJwt<T>(
  token: string,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey"
): T | null {
  const key = getEnvVar(keyName);

  try {
    const decoded = jwt.verify(token, key) as T;
    return decoded;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    log.error(e, "Error verifying JWT");
    return null;
  }
}
