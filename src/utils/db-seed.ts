import { faker } from "@faker-js/faker";
import { RoomType } from "../models/room.model";
import { createRoom } from "../services/room.service";
import connectToDb from "./connectToDb";
import log from "./logger";
import redisClient from "./redis";
import { CACHE_EXPIRATION } from "./constants";

const generateRandomDates = (numDates: number) => {
  const dates: string[] = [];
  const now = new Date();
  const oneMonthLater = new Date(now);
  oneMonthLater.setMonth(now.getMonth() + 1);

  for (let i = 0; i < numDates; i++) {
    const randomDate = faker.date.between({
      from: now,
      to: oneMonthLater,
    });

    dates.push(randomDate.toISOString().split("T")[0]);
  }

  return dates;
};

const generateRooms = (numRooms: number) => {
  const rooms = [];

  for (let i = 0; i < numRooms; i++) {
    const roomType = faker.helpers.arrayElement([
      RoomType.BASIC,
      RoomType.PREMIUM,
      RoomType.SUITE,
    ]);

    const price =
      roomType === RoomType.BASIC
        ? faker.finance.amount({ min: 50, max: 100 })
        : roomType === RoomType.PREMIUM
        ? faker.finance.amount({ min: 100, max: 200 })
        : faker.finance.amount({ min: 200, max: 500 });

    const room = {
      name: `${faker.location.street() ?? ""} Room ${i + 1}`,
      type: roomType,
      price: Number(price),
      availableDates: generateRandomDates(
        faker.number.int({ min: 3, max: 10 })
      ),
      roomNumber: i + 1,
      isAvailable: true,
    };

    rooms.push(room);
  }

  return rooms;
};

const seedRooms = async () => {
  connectToDb().catch((error) => {
    log.error(error, "Error connecting to DB");

    process.exit(1);
  });

  const rooms = generateRooms(200);

  try {
    for await (const room of rooms) {
      const createdRoom = await createRoom(room);

      await redisClient.set(
        `room:${createdRoom._id}`,
        JSON.stringify(room),
        "EX",
        CACHE_EXPIRATION
      );
    }

    log.info("DB seed completed successfully");

    process.exit(1);
  } catch (error) {
    log.error(error, "Error seeding DB");
    process.exit(1);
  }
};

const run = async () => {
  await seedRooms();
};

run();
