# UR Aerotech — Aircraft Structural Repair & Aviation Parts

A premium MERN-stack aviation website for UR Aerotech GmbH.

## Tech Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Animations:** GSAP, Framer Motion, Lenis
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JWT with HTTP-only cookies
- **Uploads:** Cloudinary
- **Email:** Nodemailer (Gmail App Password)

## Project Structure

```
uraerotech/
├── src/              # React frontend
│   ├── admin/        # Admin portal
│   ├── components/   # UI components
│   ├── pages/        # Route pages
│   ├── sections/     # Homepage sections
│   └── ...
├── server/           # Express backend
│   └── src/
└── public/           # Static assets
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   Fill in MongoDB URI, JWT secrets, Cloudinary, and SMTP credentials.

3. **Seed the database:**
   ```bash
   npm run seed
   ```

4. **Start development:**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Default Admin

After seeding:
- Email: `admin@uraerotech.com`
- Password: `ChangeMe123!`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend |
| `npm run dev:client` | Frontend only |
| `npm run dev:server` | Backend only |
| `npm run build` | Build frontend + backend for production |
| `npm run build:client` | Build frontend only |
| `npm run build:server` | Build backend only |
| `npm run seed` | Seed database |
| `npm start` | Run production server (API + static site) |

## Production Deployment

1. **Set production environment variables** in `.env`:
   ```env
   NODE_ENV=production
   PORT=5000
   VITE_API_URL=/api
   VITE_SITE_URL=https://your-domain.com
   CLIENT_URL=https://your-domain.com
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_ACCESS_SECRET=strong-secret-min-32-chars
   JWT_REFRESH_SECRET=another-strong-secret-min-32-chars
   COOKIE_DOMAIN=your-domain.com
   ```

2. **Build the app:**
   ```bash
   npm run build
   ```

3. **Seed database** (first deploy only):
   ```bash
   npm run seed
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

The production server serves the React app from `dist/` and the API from `/api/*` on the same port.

**Deploy targets:** Railway, Render, DigitalOcean, VPS, or any Node.js host. Set `NODE_ENV=production` and ensure MongoDB Atlas allows your server IP.

## Features

- Cinematic preloader with blueprint animation
- Premium aviation engineering aesthetic
- Full product inventory system with filters
- 6 service detail pages (CMS-editable)
- 6 industry sections
- Quote request system with status tracking
- Contact form with AOG option
- User dashboard with quote history
- Admin portal (products, quotes, settings)
- JWT auth with refresh tokens
- Email notifications
- SEO metadata and structured data
- Responsive design with reduced-motion support

## Contact

UR Aerotech GmbH
Gaterstr. 66B, 52538 Gangelt, Germany
info@uraerotech.com | +49 173 250 4540
