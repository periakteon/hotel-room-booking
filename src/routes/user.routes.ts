import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { createUserSchema } from "../schemas/user.schema";
import {
  createUserHandler,
  getCurrentUserHandler,
} from "../controllers/user.controller";
import deserializeUser from "../middlewares/deserializeUser";
import requireUser from "../middlewares/requireUser";

const router = Router();

router.post(
  "/api/v1/user/register",
  validateRequest(createUserSchema),
  createUserHandler
);

router.get(
  "/api/v1/user/me",
  deserializeUser,
  requireUser,
  getCurrentUserHandler
);

export default router;
