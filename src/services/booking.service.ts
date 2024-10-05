import { DocumentType } from "@typegoose/typegoose";
import BookingModel, { Booking } from "../models/booking.model";
import RoomModel from "../models/room.model";
import log from "../utils/logger";
import { isValidObjectId } from "mongoose";

export async function createBooking(
  userId: string,
  roomId: string,
  date: string
): Promise<DocumentType<Booking>> {
  try {
    if (!isValidObjectId(roomId)) {
      throw new Error("Invalid room id");
    }

    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    if (!room.availableDates.includes(date)) {
      throw new Error("Room is not available on this date");
    }

    const booking = await BookingModel.create({
      userId,
      roomId,
      date,
      totalPrice: room.price,
    });

    room.availableDates = room.availableDates.filter(
      (availableDate) => availableDate !== date
    );

    await room.save();

    return booking;
  } catch (e: unknown) {
    log.error(e, "Error occurred while creating booking");
    throw e;
  }
}
