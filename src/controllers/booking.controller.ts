import { Request } from "express";
import { createBooking } from "../services/booking.service";
import { CreateBookingInput } from "../schemas/booking.schema";
import isMongoError from "../utils/mongoError";
import { IUser, ResponseLocals } from "../middlewares/deserializeUser";
import { omit } from "lodash";

export async function createBookingHandler(
  req: Request<
    CreateBookingInput["params"],
    object,
    CreateBookingInput["body"]
  >,
  res: ResponseLocals<IUser>
) {
  const { roomId } = req.params;
  const { date } = req.body;
  const userId = res.locals.user!._id;
  try {
    const booking = await createBooking(userId, roomId, date);

    return res.send(omit(booking.toJSON(), ["__v"]));
  } catch (e: unknown) {
    if (isMongoError(e) && e.code === 11000) {
      return res.status(400).send({ error: "Booking already exists" });
    }

    if (e instanceof Error) {
      return res.status(400).send({ error: e.message });
    }

    return res.status(500).send({ error: "Internal Server Error" });
  }
}
