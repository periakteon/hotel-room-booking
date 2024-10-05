import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { createBookingSchema } from "../schemas/booking.schema";
import { createBookingHandler } from "../controllers/booking.controller";
import deserializeUser from "../middlewares/deserializeUser";
import requireUser from "../middlewares/requireUser";

const router = Router();

router.post(
  "/api/v1/booking/create/:roomId",
  deserializeUser,
  requireUser,
  validateRequest(createBookingSchema),
  createBookingHandler
);

export default router;
