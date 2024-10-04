import jwt from "jsonwebtoken";
import { getEnvVar } from "./env";

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
    console.log("🚀 ~ decoded:", decoded);
    return decoded;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.error("🚀 ~ e", e);
    return null;
  }
}
