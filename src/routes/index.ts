import { Router } from "express";
import user from "./user.routes";
import auth from "./auth.routes";

const router = Router();

router.get("/heartbeat", (_req, res) => {
  res.status(200);
  res.json({ status: "alive" });
});

router.use(auth);
router.use(user);

export default router;
