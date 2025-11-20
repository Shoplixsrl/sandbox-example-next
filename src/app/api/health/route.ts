import { NextResponse } from "next/server";
import { db } from "@/db";
import { redis } from "@/lib/redis";
import { sql } from "drizzle-orm";

/**
 * GET /api/health
 * Health check endpoint for monitoring and load balancer
 */
export async function GET() {
  const checks: Record<string, boolean | string> = {
    status: "ok",
    timestamp: new Date().toISOString(),
  };

  try {
    // Check database connection
    try {
      await db.execute(sql`SELECT 1`);
      checks.database = true;
    } catch (error) {
      checks.database = false;
      checks.databaseError = error instanceof Error ? error.message : "Unknown error";
    }

    // Check Redis connection
    try {
      await redis.ping();
      checks.redis = true;
    } catch (error) {
      checks.redis = false;
      checks.redisError = error instanceof Error ? error.message : "Unknown error";
    }

    // Overall health status
    const isHealthy = checks.database === true && checks.redis === true;

    return NextResponse.json(
      {
        status: isHealthy ? "healthy" : "degraded",
        checks,
        uptime: process.uptime(),
        version: process.env.npm_package_version || "unknown",
      },
      { status: isHealthy ? 200 : 503 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
