import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import "dotenv/config";
import apiRouter from "./routes.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors({
    origin: [
        "https://dreamhotelsawla.com",
        "https://www.dreamhotelsawla.com",
        "http://localhost:5173"
    ],
    credentials: true
}));
// Uploads folder
const uploadsDir = path.resolve(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));
// API routes
app.use("/api", apiRouter);
// Health check
app.get("/", (_req, res) => {
    res.json({
        message: "Dream Hotel API running",
        status: "success"
    });
});
// 404 handler
app.use((req, res) => {
    if (req.path.startsWith("/api")) {
        return res.status(404).json({
            error: "API route not found"
        });
    }
    res.status(404).json({
        error: "Not found"
    });
});
app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
