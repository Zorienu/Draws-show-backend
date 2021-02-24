import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("holas desde users");
});

export default router;
