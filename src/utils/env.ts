/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-namespace */
import { z, TypeOf } from "zod";

const zodEnv = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_PUBLIC_KEY: z.string(),
  REFRESH_TOKEN_PUBLIC_KEY: z.string(),
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
  | "accessTokenPrivateKey"
  | "refreshTokenPrivateKey"
  | "accessTokenPublicKey"
  | "refreshTokenPublicKey";

export function getEnvVar(key: EnvKeys): string {
  const envVars: Record<EnvKeys, string> = {
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_SECRET!,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_SECRET!,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY!,
    refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY!,
  };

  return envVars[key] ?? "";
}
