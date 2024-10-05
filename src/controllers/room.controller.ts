import { Request, Response } from "express";
import { CreateRoomInput } from "../schemas/room.schema";
import { createRoom } from "../services/room.service";
import isMongoError from "../utils/mongoError";
import { omit } from "lodash";

export async function createRoomHandler(
  req: Request<object, object, CreateRoomInput>,
  res: Response
) {
  try {
    const room = await createRoom(req.body);

    return res.send({ success: true, data: omit(room.toJSON(), ["__v"]) });
  } catch (e: unknown) {
    if (isMongoError(e) && e.code === 11000) {
      return res
        .status(400)
        .send({ success: false, message: "Room already exists" });
    }
    if (e instanceof Error) {
      return res.status(400).send({ success: false, message: e.message });
    }

    return res
      .send(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
