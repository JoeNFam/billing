import { RouterOSClient } from 'node-routeros';
import dotenv from 'dotenv';
dotenv.config();

export function createRouterOSClient() {
  return new RouterOSClient({
    host: process.env.MIKROTIK_HOST,
    user: process.env.MIKROTIK_USER,
    password: process.env.MIKROTIK_PASSWORD,
    port: process.env.MIKROTIK_PORT || 8728,
  });
}