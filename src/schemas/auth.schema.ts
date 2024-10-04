import { z } from "zod";

export const createSessionSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
  }),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>["body"];
