import { Request, Response } from "express";
import {
  CreateRoomInput,
  EditRoomInput,
  FindRoomByDatesInput,
  FindRoomByIdInput,
} from "../schemas/room.schema";
import {
  createRoom,
  editRoomById,
  findRoomById,
  findRoomsByGivenDate,
} from "../services/room.service";
import isMongoError from "../utils/mongoError";
import { omit } from "lodash";
import { isValidObjectId } from "mongoose";
import log from "../utils/logger";
import { DocumentType } from "@typegoose/typegoose";
import { Room } from "../models/room.model";

export async function createRoomHandler(
  req: Request<object, object, CreateRoomInput>,
  res: Response
) {
  try {
    const room = await createRoom(req.body);

    return res.send({ success: true, data: omit(room.toJSON(), ["__v"]) });
  } catch (e: unknown) {
    if (isMongoError(e) && e.code === 11000) {
      log.error(e, "Room already exists");
      return res
        .status(400)
        .send({ success: false, message: "Room already exists" });
    }
    if (e instanceof Error) {
      log.error(e, "Error occurred while creating room");
      return res.status(400).send({ success: false, message: e.message });
    }

    log.error(e, "Internal Server Error");
    return res
      .send(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}

export async function getRoomsByGivenDateHandler(
  req: Request<object, object, object, FindRoomByDatesInput>,
  res: Response
) {
  try {
    const { givenDate } = req.query;

    const rooms: DocumentType<Room>[] = await findRoomsByGivenDate(givenDate);

    const filteredRooms = rooms.map((room: DocumentType<Room>) =>
      omit(room, ["createdAt", "updatedAt", "__v"])
    );

    return res.send({ success: true, data: filteredRooms });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(400).send({ success: false, message: e.message });
    }

    return res
      .send(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}

export async function getRoomDetailByGivenIdHandler(
  req: Request<FindRoomByIdInput, object, object>,
  res: Response
) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res
        .status(404)
        .send({ success: false, message: "Room not found" });
    }

    const room = await findRoomById(id);

    if (!room) {
      return res
        .status(404)
        .send({ success: false, message: "Room not found" });
    }

    return res.send({ success: true, data: omit(room, ["__v"]) });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(400).send({ success: false, message: e.message });
    }

    return res
      .send(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}

export async function updateRoomByIdHandler(
  req: Request<EditRoomInput["params"], object, EditRoomInput["body"]>,
  res: Response
) {
  try {
    const { id } = req.params;

    const room = await editRoomById(id, req.body);

    if (!room) {
      return res
        .status(404)
        .send({ success: false, message: "Room not found" });
    }

    return res.send({ success: true, data: omit(room.toJSON(), ["__v"]) });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(400).send({ success: false, message: e.message });
    }

    return res
      .send(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
