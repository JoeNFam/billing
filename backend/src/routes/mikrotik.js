import { Router } from "express";
import { loginUserToHotspot, getActiveUsers } from "../services/mikrotikService.js";
const router = Router();

router.post("/login", async (req, res) => {
  const { router, username, password, ip, phone, timeMinutes } = req.body;
  try {
    const result = await loginUserToHotspot({ router, username, password, ip, phone, timeMinutes });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "MikroTik login failed", details: err.message });
  }
});

router.get("/active", async (req, res) => {
  const { router, username, password, ip } = req.query;
  try {
    const users = await getActiveUsers({ router, username, password, ip });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch active users", details: err.message });
  }
});

export default router;