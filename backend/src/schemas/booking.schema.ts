import { z } from "zod";

export const createBookingSchema = z.object({
  params: z.object({
    roomId: z.string(),
  }),
  body: z.object({
    date: z.string(),
  }),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
