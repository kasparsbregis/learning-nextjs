import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

// Configure Neon for serverless environments (Vercel)
if (typeof globalThis !== "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create PrismaNeon adapter - ALWAYS use it to avoid Query Engine binary issues
// This works in both local and serverless environments
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({
  connectionString: connectionString,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter, // Always use adapter - no Query Engine needed
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
