# MikroTik RB951 Router Manager

A web-based interface to connect to and manage a MikroTik RB951 router via its API.

## Features

- Connect to your MikroTik router using credentials.
- View router status, interfaces, and connected clients.
- Basic management tasks: reboot, manage users, fetch addresses.
- Clean, responsive design.
- Separation of frontend and backend for security and scalability.

## Project Structure

- `/backend` – Node.js Express API server (handles MikroTik RouterOS API)
- `/frontend` – React SPA (user interface)

## Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- MikroTik RB951 router with API enabled
- (Optional) Docker

---

### 1. Backend Setup

```bash
cd backend
cp .env.example .env  # Then edit .env to match your MikroTik credentials
npm install
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access the app at [http://localhost:5173](http://localhost:5173).

---

## Deployment

- Deploy backend on a secure server (e.g. Heroku, Render, or your own VPS).
- Deploy frontend on GitHub Pages, Vercel, Netlify, etc.
- Set frontend `/frontend/src/api.js` BASE_URL to your backend's public URL.

---

## Security & Notes

- The backend directly communicates with the RouterOS API. **Never expose router credentials in the frontend.**
- Use HTTPS for both frontend and backend.
- Restrict backend access as needed (e.g., with JWT auth).

## License

MIT
