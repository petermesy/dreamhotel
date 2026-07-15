import { Response } from "express";
import { prisma } from "../../core/db.js";
import { AuthenticatedRequest } from "../../core/middleware.js";

export async function getAuditLogs(_req: AuthenticatedRequest, res: Response) {
  const logs = await prisma.auditLog.findMany({
    include: {
      user: { select: { id: true, email: true, name: true, role: true } },
      booking: true
    },
    orderBy: { timestamp: "desc" }
  });
  res.json(logs);
}
