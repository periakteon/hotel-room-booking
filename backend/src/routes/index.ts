import { Router } from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import room from "./room.routes";
import booking from "./booking.routes";

const router = Router();

router.get("/heartbeat", (_req, res) => {
  res.status(200);
  res.json({ status: "alive" });
});

router.use(auth);
router.use(user);
router.use(room);
router.use(booking);

export default router;
