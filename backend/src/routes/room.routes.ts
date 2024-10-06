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

// Create room
router.post(
  "/api/v1/room/create",
  deserializeUser,
  assertAdmin,
  validateRequest(createRoomSchema),
  createRoomHandler
);

// Get rooms by given date
router.get(
  "/api/v1/room/findByGivenDate",
  validateRequest(findRoomByGivenDateSchema),
  getRoomsByGivenDateHandler
);

// Get room by given ID
router.get(
  "/api/v1/room/view/:id",
  validateRequest(findRoomByGivenIdSchema),
  getRoomDetailByGivenIdHandler
);

// Update room by ID
router.patch(
  "/api/v1/room/edit/:id",
  deserializeUser,
  assertAdmin,
  validateRequest(editRoomSchema),
  updateRoomByIdHandler
);

export default router;
