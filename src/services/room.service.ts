import { DocumentType } from "@typegoose/typegoose";
import RoomModel, { Room } from "../models/room.model";
import { CACHE_EXPIRATION } from "../utils/constants";
import redisClient from "../utils/redis";
import log from "../utils/logger";

export async function createRoom(input: Room) {
  const room = await RoomModel.create(input);

  await redisClient.set(
    `room:${room._id}`,
    JSON.stringify(room),
    "EX",
    CACHE_EXPIRATION
  );

  log.info("Room with CACHE created successfully");

  return room;
}

export async function findRoomById(id: string) {
  const cachedRoom = await redisClient.get(`room:${id}`);

  if (cachedRoom) {
    log.info("REDIS CACHE HIT");
    return JSON.parse(cachedRoom);
  }

  const room = await RoomModel.findById(id);

  if (room) {
    await redisClient.set(
      `room:${id}`,
      JSON.stringify(room),
      "EX",
      CACHE_EXPIRATION
    );

    log.info("Cache created successfully");
  }

  return room;
}

export async function findRoomsByGivenDate(
  date: string
): Promise<DocumentType<Room>[]> {
  const cacheKey = `rooms:date:${date}`;

  const cachedRooms = await redisClient.get(cacheKey);

  if (cachedRooms) {
    log.info("REDIS CACHE HIT");
    return JSON.parse(cachedRooms) as DocumentType<Room>[];
  }

  const rooms = await RoomModel.find({ availableDates: date });

  await redisClient.set(
    cacheKey,
    JSON.stringify(rooms),
    "EX",
    CACHE_EXPIRATION
  );

  log.info("Cache created successfully");

  return rooms;
}

export async function findRoomByRoomNumber(roomNumber: number) {
  const cacheKey = `room:number:${roomNumber}`;

  const cachedRoom = await redisClient.get(cacheKey);

  if (cachedRoom) {
    log.info("REDIS CACHE HIT");
    return JSON.parse(cachedRoom);
  }

  const room = await RoomModel.findOne({ roomNumber });

  if (room) {
    await redisClient.set(
      cacheKey,
      JSON.stringify(room),
      "EX",
      CACHE_EXPIRATION
    );

    log.info("Cache created successfully");
  }

  return room;
}

export async function editRoomById(id: string, update: Partial<Room>) {
  const room = await RoomModel.findByIdAndUpdate(id, update, { new: true });

  if (room) {
    await redisClient.set(
      `room:${id}`,
      JSON.stringify(room),
      "EX",
      CACHE_EXPIRATION
    );

    log.info("Cache updated successfully");
  }

  return room;
}
