import { z } from "zod";
import { RoomType } from "../models/room.model";

export const createRoomSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum([RoomType.BASIC, RoomType.PREMIUM, RoomType.SUITE]),
    price: z.number().min(0, "Price must be a positive number"),
    availableDates: z.array(z.string()).optional().default([]),
    roomNumber: z
      .number()
      .int()
      .positive("Room number must be a positive integer"),
    isAvailable: z.boolean(),
  }),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>["body"];

export const findRoomByGivenDateSchema = z.object({
  query: z.object({
    givenDate: z.string(),
  }),
});

export type FindRoomByDatesInput = z.infer<
  typeof findRoomByGivenDateSchema
>["query"];
