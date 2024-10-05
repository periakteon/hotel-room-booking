import { Router } from "express";
import {
  createRoomSchema,
  findRoomByGivenDateSchema,
  findRoomByGivenIdSchema,
} from "../schemas/room.schema";
import validateRequest from "../middlewares/validateRequest";
import {
  createRoomHandler,
  getRoomDetailByGivenIdHandler,
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

router.get(
  "/api/v1/room/view/:id",
  validateRequest(findRoomByGivenIdSchema),
  getRoomDetailByGivenIdHandler
);

export default router;
