import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

// Configure Neon for serverless environments (Vercel)
if (typeof globalThis !== "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create PrismaNeon adapter for serverless (Vercel)
// This avoids the need for Query Engine binaries
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Use adapter in production (Vercel) to avoid Query Engine binary issues
    adapter: process.env.VERCEL ? adapter : undefined,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
