import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.service";
import { MongooseError } from "mongoose";
import isMongoError from "../utils/mongoError";

export async function createUserHandler(
  req: Request<object, object, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);

    return res.send({ success: true, data: user.email });
  } catch (e: unknown) {
    if (isMongoError(e) && e.code === 11000) {
      return res
        .status(400)
        .send({ success: false, message: "Email is already in use" });
    }

    if (e instanceof MongooseError) {
      return res.status(400).send({ success: false, message: e.message });
    }

    if (e instanceof Error) {
      return res.status(400).send({ success: false, message: e.message });
    }

    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
