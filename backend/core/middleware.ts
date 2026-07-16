import { Request, Response, NextFunction } from "express";
import { prisma } from "./db.js";
import { UnauthorizedError, ForbiddenError } from "./errors.js";

// Custom interfaces to enforce strict types without using 'any' assertions
export interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  role: string; // "OWNER" | "RECEPTION" | "USER" | "ADMIN"
  status: string; // "ACTIVE" | "SUSPENDED"
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

async function resolveAuthenticatedUser(token: string): Promise<AuthenticatedUser | null> {
  const legacyParts = token.split(":");
  if (legacyParts.length === 4) {
    const [userIdStr, role, email] = legacyParts;
    if (!userIdStr || !role || !email) {
      return null;
    }

    const userId = Number.parseInt(userIdStr, 10);
    if (!Number.isInteger(userId)) {
      return null;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.status !== "ACTIVE" || user.role !== role || user.email !== email) {
      return null;
    }

    return user;
  }

  const user = await prisma.user.findFirst({ where: { email: token } });
  if (!user || user.status !== "ACTIVE") {
    return null;
  }

  return user;
}

export async function authenticate(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new UnauthorizedError("No authorization token provided"));
  }

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  if (!token) {
    return next(new UnauthorizedError("No authorization token provided"));
  }

  try {
    const user = await resolveAuthenticatedUser(token);
    if (!user) {
      return next(new UnauthorizedError("Account suspended or unauthorized session"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError("Authentication failed"));
  }
}

export async function authenticateOptional(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  if (!token) {
    return next();
  }

  try {
    const user = await resolveAuthenticatedUser(token);
    if (user) {
      req.user = user;
    }
    next();
  } catch {
    next();
  }
}

export function requireRoles(...roles: string[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(new UnauthorizedError("Authentication required"));
    }
    if (!roles.includes(user.role)) {
      return next(new ForbiddenError(`Forbidden: ${roles.join(" or ")} permissions required`));
    }
    next();
  };
}

export const requireOwner = requireRoles("OWNER");
export const requireAdminOrOwner = requireRoles("RECEPTION", "OWNER", "ADMIN");
