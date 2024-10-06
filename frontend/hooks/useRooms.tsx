import API from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export enum RoomType {
  BASIC = "basic",
  PREMIUM = "premium",
  SUITE = "suite",
}

const roomSchema = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum([RoomType.BASIC, RoomType.PREMIUM, RoomType.SUITE]),
  price: z.number(),
  availableDates: z.array(z.string()).default([]),
  roomNumber: z.number(),
  isAvailable: z.boolean(),
});

const roomsSchema = z.object({
  success: z.boolean(),
  data: z.array(roomSchema),
});

export type Room = z.infer<typeof roomSchema>;
export type Rooms = z.infer<typeof roomsSchema>;

async function getRooms({ givenDate }: { givenDate: string | null }) {
  try {
    const response = await API.get("/room/findByGivenDate", {
      params: { givenDate },
    });

    const { success, data } = await roomsSchema.safeParseAsync(response.data);

    if (!success) {
      throw new Error("Failed to fetch rooms");
    }

    return data.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw e;
  }
}

export default function useRooms({ givenDate }: { givenDate: string | null }) {
  return useQuery({
    queryKey: ["rooms", givenDate],
    enabled: !!givenDate,
    queryFn: () => getRooms({ givenDate }),
    retry: false,
  });
}
