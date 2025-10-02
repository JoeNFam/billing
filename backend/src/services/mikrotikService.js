import { RouterOSClient } from "routeros-client";

// Connect and log user in after MPesa payment
export async function loginUserToHotspot({ ip, username, password, phone, timeMinutes }) {
  const client = new RouterOSClient({ host: ip, user: username, password });
  await client.connect();
  // Add user session/login (example, must match your MikroTik config)
  // You may need to use "/ip/hotspot/user/add" or "/ip/hotspot/active/login"
  const res = await client.menu("/ip/hotspot/user").add({
    name: phone,
    password: phone, // Or random
    profile: "default",
    limitUptime: `${timeMinutes}m`,
  });
  await client.close();
  return { success: true, res };
}

export async function getActiveUsers({ ip, username, password }) {
  const client = new RouterOSClient({ host: ip, user: username, password });
  await client.connect();
  const res = await client.menu("/ip/hotspot/active").getAll();
  await client.close();
  return res;
}