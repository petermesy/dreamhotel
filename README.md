# Dream Pension

A full-stack guest house management application built with React, Vite, and Express.

---

## 🛠️ Technology

* Frontend: React + Vite
* Backend: Express
* Build: Vite + esbuild

---

## 🚀 Local Development

### Prerequisites
* Node.js v18+
* npm

### Install
```bash
npm install
```

### Run development server
```bash
npm run dev
```

The app is available at `http://localhost:3000`.

---

## 📦 Production Build

### Build frontend only
```bash
npm install
npx vite build
```

This outputs optimized frontend files to `dist/`.

### Serve frontend only (test)
```bash
npx serve -s dist -l 5173
```

or:
```bash
npx http-server dist -p 5173
```

### Build backend only
```bash
npx esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs
```

### Run production server
```bash
NODE_ENV=production PORT=3000 node dist/server.cjs
```

PowerShell:
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

* `npm run build` builds both frontend and backend for production.
* Make sure production environment variables are set before starting the server.
* Use a process manager such as PM2 or systemd in production.

