import { z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password must be at least 6 characters"),
      passwordConfirmation: z.string({
        required_error: "Password confirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
