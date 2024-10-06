/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-namespace */
import { z, TypeOf } from "zod";

const zodEnv = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_PUBLIC_KEY: z.string(),
  REFRESH_TOKEN_PUBLIC_KEY: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  APP_ORIGIN: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof zodEnv> {}
  }
}

try {
  zodEnv.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(", ")}` : field
      )
      .join("\n  ");
    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
    process.exit(1);
  }
}

type EnvKeys =
  | "DATABASE_URL"
  | "accessTokenPrivateKey"
  | "refreshTokenPrivateKey"
  | "accessTokenPublicKey"
  | "refreshTokenPublicKey"
  | "REDIS_HOST"
  | "REDIS_PORT"
  | "APP_ORIGIN";

export function getEnvVar(key: EnvKeys): string {
  const envVars: Record<EnvKeys, string> = {
    DATABASE_URL: process.env.DATABASE_URL!,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_SECRET!,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_SECRET!,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY!,
    refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY!,
    REDIS_HOST: process.env.REDIS_HOST!,
    REDIS_PORT: process.env.REDIS_PORT!,
    APP_ORIGIN: process.env.APP_ORIGIN!,
  };

  return envVars[key] ?? "";
}
