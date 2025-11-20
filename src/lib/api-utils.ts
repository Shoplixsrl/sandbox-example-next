import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";

/**
 * API response helpers
 */
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: unknown
): NextResponse<ApiResponse> {
  const error: ApiResponse["error"] = {
    code,
    message,
  };

  if (details !== undefined) {
    error.details = details;
  }

  return NextResponse.json({ error }, { status });
}

export function notFoundResponse(message = "Resource not found") {
  return errorResponse("NOT_FOUND", message, 404);
}

export function validationError(message: string, details?: unknown) {
  return errorResponse("VALIDATION_ERROR", message, 400, details);
}

export function unauthorizedResponse(message = "Unauthorized") {
  return errorResponse("UNAUTHORIZED", message, 401);
}

export function forbiddenResponse(message = "Forbidden") {
  return errorResponse("FORBIDDEN", message, 403);
}

/**
 * Parse request body with validation
 */
export async function parseRequestBody<T>(request: Request): Promise<T> {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid JSON body");
  }
}

/**
 * Parse URL search params
 */
export function parseSearchParams(url: URL): Record<string, string> {
  const params: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
