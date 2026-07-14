import { Response } from "express";
import { prisma } from "../../core/db.js";
import * as crypto from "crypto";
import { loginSchema, signupSchema } from "./auth.schemas.js";
import { ValidationError, UnauthorizedError, ConflictError, ForbiddenError } from "../../core/errors.js";
import { AuthenticatedRequest } from "../../core/middleware.js";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function login(req: AuthenticatedRequest, res: Response) {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid request data", result.error.flatten().fieldErrors);
  }

  const { email, password } = result.data;
  const hashed = hashPassword(password);
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== hashed) {
    throw new UnauthorizedError("Invalid email or password");
  }

  if (user.status === "SUSPENDED") {
    throw new ForbiddenError("This account has been suspended by the administrator");
  }

  const sessionToken = `${user.id}:${user.role}:${user.email}:${crypto.createHash("md5").update(user.password + "salt").digest("hex")}`;

  res.json({
    token: sessionToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  });
}

export async function signup(req: AuthenticatedRequest, res: Response) {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid signup registration data", result.error.flatten().fieldErrors);
  }

  const { email, password, name } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ConflictError("This email address is already registered");
  }

  const hashed = hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      role: "USER", // Regular customer/guest role
      status: "ACTIVE"
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true
    }
  });

  res.status(201).json(user);
}

export async function getMe(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  if (!user) {
    throw new UnauthorizedError("Not logged in");
  }
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status
  });
}
