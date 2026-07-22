import { prisma } from "../../core/db.js";
export async function getAuditLogs(_req, res) {
    const logs = await prisma.auditLog.findMany({
        include: {
            user: { select: { id: true, email: true, name: true, role: true } },
            booking: true
        },
        orderBy: { timestamp: "desc" }
    });
    res.json(logs);
}
