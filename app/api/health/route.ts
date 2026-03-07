import mongoose from "mongoose";

import { apiError, apiSuccess, AppError } from "@/lib/api-error";
import { dbConnect } from "@/lib/mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const start = Date.now();
    await dbConnect();
    const dbLatency = Date.now() - start;

    const readyState = mongoose.connection.readyState;
    const dbStatus = readyState === 1 ? "connected" : "disconnected";

    return apiSuccess({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: dbStatus,
        latencyMs: dbLatency,
      },
    });
  } catch (_error) {
    return apiError(new AppError("Service unavailable", 503, "SERVICE_UNAVAILABLE"));
  }
}
