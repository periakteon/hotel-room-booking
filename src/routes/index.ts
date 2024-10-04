import express from "express";

const router = express.Router();

router.get("/heartbeat", (_req, res) => {
  res.status(200);
  res.json({ status: "alive" });
});

export default router;
