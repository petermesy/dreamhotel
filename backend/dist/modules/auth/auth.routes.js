import { Router } from "express";
import { login, signup, getMe } from "./auth.controller.js";
import { authenticate } from "../../core/middleware.js";
import { asyncHandler } from "../../core/errors.js";
const router = Router();
router.post("/login", asyncHandler(login));
router.post("/signup", asyncHandler(signup));
router.get("/me", authenticate, asyncHandler(getMe));
export default router;
