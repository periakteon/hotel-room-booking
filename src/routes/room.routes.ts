import { Router } from "express";
import {
  createRoomSchema,
  editRoomSchema,
  findRoomByGivenDateSchema,
  findRoomByGivenIdSchema,
} from "../schemas/room.schema";
import validateRequest from "../middlewares/validateRequest";
import {
  createRoomHandler,
  getRoomDetailByGivenIdHandler,
  getRoomsByGivenDateHandler,
  updateRoomByIdHandler,
} from "../controllers/room.controller";
import deserializeUser from "../middlewares/deserializeUser";
import assertAdmin from "../middlewares/isAdmin";

const router = Router();

router.post(
  "/api/v1/room/create",
  deserializeUser,
  assertAdmin,
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

router.patch(
  "/api/v1/room/edit/:id",
  deserializeUser,
  assertAdmin,
  validateRequest(editRoomSchema),
  updateRoomByIdHandler
);

export default router;
