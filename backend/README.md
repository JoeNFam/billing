# MikroTik Manager Backend

Node.js Express backend for communicating with MikroTik RouterOS API.

## Configuration

Copy `.env.example` to `.env` and set your MikroTik router credentials.

## Running

```bash
npm install
npm run dev
```

The API will start at `http://localhost:4000`.

## Endpoints

- `GET /api/status` – Router resource stats
- `GET /api/interfaces` – Network interfaces
- `GET /api/leases` – DHCP leases (clients)
- `GET /api/users` – Router users
- `POST /api/users` – Add user (`{ name, password, group }`)
- `DELETE /api/users/:id` – Remove user
- `POST /api/reboot` – Reboot the router
