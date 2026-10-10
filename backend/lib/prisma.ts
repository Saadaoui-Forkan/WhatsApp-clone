import { PrismaClient } from "@prisma/client";

/**
 * Single shared PrismaClient instance.
 *
 * In development, hot reloads (tsx watch) can re-evaluate modules which would
 * otherwise create a new connection pool on every reload. Caching the client on
 * `globalThis` prevents exhausting database connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
