# Digital Oasis

A modern, secure, mobile-first MikroTik hotspot billing system with integrated MPesa (Daraja) payments.

## Features

- Self-service hotspot portal
- MPesa (Daraja) payment integration
- Instant user onboarding after payment
- Admin dashboard for packages, users, routers, and payments
- MikroTik RouterOS API integration
- Secure, encrypted, and rate-limited backend

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js (Express), Sequelize
- **Database:** PostgreSQL
- **MikroTik API:** routeros-client (Node)
- **MPesa API:** direct HTTP or mpesa-api/daraja
- **Auth:** JWT for admin dashboard

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- MikroTik RouterOS device
- Safaricom Daraja credentials

### Quickstart

```bash
# 1. Clone the repo
git clone https://github.com/your-org/digital-oasis.git
cd digital-oasis

# 2. Install backend & frontend dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Configure .env files in backend/ and frontend/ (see .env.example)

# 4. Run the database migration
cd backend
npm run db:migrate

# 5. Run backend and frontend (dev mode)
npm run dev
cd ../frontend && npm run dev
```

---

## MikroTik Hotspot Setup

- Enable **login-by-http-pap** and/or **trial + redirect** mode.
- Set up a walled garden for portal access.
- Add backend server IP to MikroTik API allowed list.

---

## MPesa (Daraja) Setup

- Register your app via Safaricom developer portal.
- Set `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`, `MPESA_PASSKEY`, and `MPESA_CALLBACK_URL` in `.env`.

---

## Security Checklist

- Use HTTPS everywhere (enforced in production).
- Keep MikroTik credentials encrypted in DB.
- Enable rate limiting on login/payment endpoints.
- Validate MPesa webhook signatures.

---

## Project Structure

```
digital-oasis/
├── backend/         # Express/Node app (API, DB, MPesa, MikroTik integration)
└── frontend/        # Next.js (hotspot portal, admin dashboard)
```

---

## Deployment

- **Frontend:** Vercel or similar (Next.js)
- **Backend:** Render, Railway, or similar
- **DB:** Railway, ElephantSQL, or managed Postgres

---

## License

MIT