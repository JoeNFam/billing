import { Router } from "express";
import { initiateStkPush, mpesaCallback } from "../services/mpesaService.js";

const router = Router();

// Initiate STK Push
router.post("/pay", async (req, res) => {
  const { phone, amount, account } = req.body;
  try {
    const result = await initiateStkPush(phone, amount, account);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "STK push failed", details: err.message });
  }
});

// MPesa webhook
router.post("/callback", mpesaCallback);

export default router;