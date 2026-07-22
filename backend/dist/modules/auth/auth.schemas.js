import { z } from "zod";
export const loginSchema = z.object({
    email: z.string().email("A valid email address is required"),
    password: z.string().min(1, "Password is required")
});
export const signupSchema = z.object({
    email: z.string().email("A valid email address is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(1, "Full name is required for registration")
});
