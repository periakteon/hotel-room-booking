import API from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
}

const userSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum([UserRole.CUSTOMER, UserRole.ADMIN]),
  bookings: z.array(z.any()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  iat: z.number(),
  exp: z.number(),
});

export type User = z.infer<typeof userSchema>;

async function getUser() {
  try {
    const response = await API("/user/me");

    if (response.status === 403) {
      throw new Error("Unauthorized");
    }

    const data = userSchema.parse(response.data);
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw e;
  }
}

export default function useUser() {
  return useQuery({ queryKey: ["user"], queryFn: getUser, retry: false });
}
