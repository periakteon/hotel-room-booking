import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { createUserSchema } from "../schemas/user.schema";
import { createUserHandler } from "../controllers/user.controller";

const router = Router();

router.post(
  "/api/v1/user/register",
  validateRequest(createUserSchema),
  createUserHandler
);

export default router;
