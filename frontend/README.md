# Cyber Community Frontend

React 19 single-page application built with Vite, React Router, Mantine, TanStack Query, Redux Toolkit, and Zustand.

## Development

```bash
cp .env.example .env
npm install --legacy-peer-deps
npm run dev
```

The development server runs at `http://localhost:3000`.

## Environment variables

```dotenv
VITE_GOOGLE_CLIENT_ID=
VITE_BASE_DOMAIN=http://localhost:3069/
VITE_BASE_DOMAIN_CLOUDINARY=
VITE_IS_PRODUCTION=false
```

## Production

```bash
npm run build
npm run preview
```

The Docker image builds the static application and serves `dist/` with Nginx. Browser route fallback is configured in `nginx.conf`.
