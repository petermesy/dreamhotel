# Dream Hotel

A full-stack guest house management application for guest registration, room booking, enquiries, and back-office management. Built with React/Vite on the frontend and Express on the backend.

---

## 🛠️ Technology

- Frontend: React + Vite
- Backend: Express
- Build: Vite + esbuild

---

## 🚀 Local Development

### Prerequisites

- Node.js v18+
- npm

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The app is available at `http://localhost:3000`.

### Database setup

This project uses Prisma with a database configured through `prisma/schema.prisma`.

#### 1. Configure your database URL

Create or update `.env` with a valid Prisma connection string, for example:

```env
DATABASE_URL="mysql://root:your_password@127.0.0.1:3306/dream_pension"
```

#### 2. Apply the schema

```bash
npx prisma db push
```

Or, if you want to create a migration history:

```bash
npx prisma migrate dev --name init
```

#### 3. Seed demo data

```bash
npx ts-node prisma/seed.ts
```

If you want to reset and reseed the database from scratch:

```bash
npx prisma migrate reset --force
```

---

## 📦 Production Build

### Build frontend only

#### macOS / Linux

```bash
npm install
npx vite build
```

#### Windows PowerShell

```powershell
npm install
npx vite build
```

This outputs optimized frontend files to `dist/`.

### Serve frontend only (test)

#### macOS / Linux

```bash
npx serve -s dist -l 5173
```

#### Windows PowerShell

```powershell
npx serve -s dist -l 5173
```

or:

#### macOS / Linux

```bash
npx http-server dist -p 5173
```

#### Windows PowerShell

```powershell
npx http-server dist -p 5173
```

### Build backend only

#### macOS / Linux

```bash
npx esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs
```

#### Windows PowerShell

```powershell
npx esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs
```

### Run production server

#### macOS / Linux

```bash
NODE_ENV=production PORT=3000 node dist/server.cjs
```

#### Windows PowerShell

```powershell
$env:NODE_ENV='production'; $env:PORT='3000'; node dist/server.cjs
```

---

## 🌐 Production Deployment

Use Nginx to serve static frontend files from `dist/` and proxy `/api/` to the backend.

```nginx
server {
    listen 80;
    server_name your.domain;
    root /path/to/project/dist;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx || sudo nginx -s reload
```

---

## ⚠️ Notes

- `npm run build` builds both frontend and backend for production.
- Make sure production environment variables are set before starting the server.
- Use a process manager such as PM2 or systemd in production.

---

## ☁️ Cloudinary Image Uploads

This project uses Cloudinary for gallery image uploads and runtime optimization.

### Required environment variables

Set these for the backend to upload images:

- `CLOUDINARY_URL` or all three of:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

If credentials are not configured, gallery uploads will be disabled.

### How uploads work

- Admin uploads are handled by `backend/modules/gallery/gallery.controller.ts`.
- Uploaded files are streamed to Cloudinary using the `cloudinary` package.
- Uploaded images are stored under the `dream_hotel_gallery` folder in Cloudinary.
- The backend stores the secure Cloudinary URL in the gallery record.

### Frontend optimization

The frontend optimizes Cloudinary image URLs at render time using `src/features/gallery/cloudinary.ts`.

The helper supports options like:

- `width`
- `crop`
- `gravity`
- `quality`
- `dpr`
- `format`

It creates URLs with Cloudinary transformations such as `f_auto`, `q_auto`, and `dpr_auto`.

### Usage examples

Example backend env values:

```env
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

Example runtime URL optimization:

```ts
import { optimizeCloudinaryUrl } from "./features/gallery/cloudinary";

const optimizedUrl = optimizeCloudinaryUrl(image.url, {
  width: 600,
  crop: "fill",
  gravity: "auto",
  quality: "auto",
  dpr: "auto",
  format: "auto",
});
```

This is used in gallery components such as `GalleryCard` and `GalleryLightbox`.
