import { PrismaClient } from "@prisma/client";
// Singleton PrismaClient instance to avoid exhausting database connections in Express
export const prisma = new PrismaClient();
