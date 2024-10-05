import { Router } from "express";
import { createRoomSchema } from "../schemas/room.schema";
import validateRequest from "../middlewares/validateRequest";
import { createRoomHandler } from "../controllers/room.controller";

const router = Router();

router.post(
  "/api/v1/room/create",
  validateRequest(createRoomSchema),
  createRoomHandler
);

export default router;
