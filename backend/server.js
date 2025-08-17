import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createRouterOSClient } from "./routerosClient.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Helper to connect and run command
async function mikrotikCommand(command, args = []) {
  const conn = createRouterOSClient();
  await conn.connect();
  try {
    const data = await conn.menu(command).getAll(...args);
    await conn.close();
    return data;
  } catch (err) {
    await conn.close();
    throw err;
  }
}

// Basic status endpoint
app.get("/api/status", async (req, res) => {
  try {
    const system = await mikrotikCommand("/system/resource/print");
    res.json(system[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Interfaces
app.get("/api/interfaces", async (req, res) => {
  try {
    const interfaces = await mikrotikCommand("/interface/print");
    res.json(interfaces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List DHCP leases (connected clients)
app.get("/api/leases", async (req, res) => {
  try {
    const leases = await mikrotikCommand("/ip/dhcp-server/lease/print");
    res.json(leases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List users
app.get("/api/users", async (req, res) => {
  try {
    const users = await mikrotikCommand("/user/print");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add user (POST)
app.post("/api/users", async (req, res) => {
  const { name, password, group } = req.body;
  if (!name || !password || !group) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const conn = createRouterOSClient();
  await conn.connect();
  try {
    await conn.menu("/user/add").add({ name, password, group });
    await conn.close();
    res.json({ success: true });
  } catch (err) {
    await conn.close();
    res.status(500).json({ error: err.message });
  }
});

// Remove user (DELETE)
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const conn = createRouterOSClient();
  await conn.connect();
  try {
    await conn.menu("/user/remove").remove({ ".id": id });
    await conn.close();
    res.json({ success: true });
  } catch (err) {
    await conn.close();
    res.status(500).json({ error: err.message });
  }
});

// Reboot
app.post("/api/reboot", async (req, res) => {
  const conn = createRouterOSClient();
  await conn.connect();
  try {
    await conn.menu("/system/reboot").call();
    await conn.close();
    res.json({ success: true });
  } catch (err) {
    await conn.close();
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));