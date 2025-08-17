# MikroTik Manager Frontend

React SPA for managing MikroTik routers via backend API.

## Development

```bash
npm install
npm run dev
```

- The Vite dev server proxies `/api` to backend.
- Build for production: `npm run build`

## Configuration

- Edit `src/api.js` to set `BASE_URL` if deploying backend elsewhere.
