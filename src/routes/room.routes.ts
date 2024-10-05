import { Router } from "express";
import {
  createRoomSchema,
  findRoomByGivenDateSchema,
} from "../schemas/room.schema";
import validateRequest from "../middlewares/validateRequest";
import {
  createRoomHandler,
  getRoomsByGivenDateHandler,
} from "../controllers/room.controller";

const router = Router();

router.post(
  "/api/v1/room/create",
  validateRequest(createRoomSchema),
  createRoomHandler
);

router.get(
  "/api/v1/room/findByGivenDate",
  validateRequest(findRoomByGivenDateSchema),
  getRoomsByGivenDateHandler
);

export default router;
