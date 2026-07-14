import express from "express";
import path from "path";
import fs from "fs";
import apiRouter from "./backend/routes.js";
import { createServer as createViteServer } from "vite";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ensure the local uploads directory exists and serve it statically
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Mount the modular backend API routes
app.use("/api", apiRouter);

async function startServer() {
  if (process.env.BACKEND_ONLY === "true") {
    console.log("Running in BACKEND_ONLY mode. Frontend static/Vite assets are skipped.");
  } else if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
