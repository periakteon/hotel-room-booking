import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { createSessionSchema } from "../schemas/auth.schema";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controllers/auth.controller";

const router = Router();

router.post(
  "/api/v1/user/session",
  validateRequest(createSessionSchema),
  createSessionHandler
);

router.post("/api/v1/user/session/refresh", refreshAccessTokenHandler);

export default router;
