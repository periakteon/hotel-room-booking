import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { createSessionSchema } from "../schemas/auth.schema";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controllers/auth.controller";

const router = Router();

// Login
router.post(
  "/api/v1/user/session",
  validateRequest(createSessionSchema),
  createSessionHandler
);

// Refresh access token
router.post("/api/v1/user/session/refresh", refreshAccessTokenHandler);

// Logout
router.delete("/api/v1/user/session", (_req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.sendStatus(200);
});

export default router;
