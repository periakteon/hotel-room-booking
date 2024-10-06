import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.service";
import { MongooseError } from "mongoose";
import isMongoError from "../utils/mongoError";
import log from "../utils/logger";
import { UserRole } from "../models/user.model";

export async function createUserHandler(
  req: Request<object, object, CreateUserInput>,
  res: Response
) {
  try {
    const user = await createUser(req.body);

    return res.send({ success: true, data: user.email });
  } catch (e: unknown) {
    if (isMongoError(e) && e.code === 11000) {
      log.error(e, "Email is already in use");
      return res
        .status(400)
        .send({ success: false, message: "Email is already in use" });
    }

    if (e instanceof MongooseError) {
      log.error(e, "Error occurred while creating user in mongoose");
      return res.status(400).send({ success: false, message: e.message });
    }

    if (e instanceof Error) {
      log.error(e, "Error occurred while creating user");
      return res.status(400).send({ success: false, message: e.message });
    }

    log.error(e, "Internal Server Error");
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}

export async function createAdminHandler(
  req: Request<object, object, CreateUserInput>,
  res: Response
) {
  try {
    const user = await createUser({ ...req.body, role: UserRole.ADMIN });

    return res.send({ success: true, data: user.email });
  } catch (e: unknown) {
    if (isMongoError(e) && e.code === 11000) {
      log.error(e, "Email is already in use");
      return res
        .status(400)
        .send({ success: false, message: "Email is already in use" });
    }

    if (e instanceof MongooseError) {
      log.error(e, "Error occurred while creating user in mongoose");
      return res.status(400).send({ success: false, message: e.message });
    }

    if (e instanceof Error) {
      log.error(e, "Error occurred while creating user");
      return res.status(400).send({ success: false, message: e.message });
    }

    log.error(e, "Internal Server Error");
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}

export async function getCurrentUserHandler(_req: Request, res: Response) {
  // TODO: Return the current user using DB to ensure the user is up-to-date
  return res.send(res.locals.user);
}
