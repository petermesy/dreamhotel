import { Response } from "express";
import { prisma } from "../../core/db.js";
import {
  createStaffAccountSchema,
  updateStaffStatusSchema
} from "./booking.schemas.js";
import { ValidationError, NotFoundError, ConflictError, UnauthorizedError } from "../../core/errors.js";
import { AuthenticatedRequest } from "../../core/middleware.js";
import { hashPassword } from "./booking.shared.js";

export async function getStaffRoster(_req: AuthenticatedRequest, res: Response) {
  const staff = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, status: true, createdAt: true }
  });
  res.json(staff);
}

export async function createStaffAccount(req: AuthenticatedRequest, res: Response) {
  const result = createStaffAccountSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("All fields are required and must be valid", result.error.flatten().fieldErrors);
  }

  const { email, name, password, role } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ConflictError("Email is already taken");
  }

  const created = await prisma.user.create({
    data: {
      email,
      name,
      password: hashPassword(password),
      role,
      status: "ACTIVE"
    },
    select: { id: true, email: true, name: true, role: true, status: true }
  });

  res.status(201).json(created);
}

export async function updateStaffStatus(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const result = updateStaffStatusSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid status value", result.error.flatten().fieldErrors);
  }

  const { status } = result.data;
  const targetUserId = parseInt(id, 10);
  if (isNaN(targetUserId)) {
    throw new ValidationError("Invalid staff ID");
  }

  try {
    const updated = await prisma.user.update({
      where: { id: targetUserId },
      data: { status },
      select: { id: true, email: true, name: true, role: true, status: true }
    });
    res.json(updated);
  } catch {
    throw new NotFoundError(`Staff account with ID ${targetUserId} not found`);
  }
}

export async function deleteStaffAccount(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const targetUserId = parseInt(id, 10);
  if (isNaN(targetUserId)) {
    throw new ValidationError("Invalid staff ID");
  }

  const loggedInOwner = req.user;
  if (!loggedInOwner) {
    throw new UnauthorizedError("Authentication required");
  }

  if (loggedInOwner.id === targetUserId) {
    throw new ValidationError("Cannot delete your own administrator account");
  }

  try {
    await prisma.user.delete({ where: { id: targetUserId } });
    res.json({ success: true, message: "Staff account deleted permanently" });
  } catch {
    throw new NotFoundError(`Staff account with ID ${targetUserId} not found`);
  }
}
