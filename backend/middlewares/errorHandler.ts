import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { isProduction } from "../config/env.js";

/**
 * Catch-all for unmatched routes. Registered after all routes/static files.
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Centralized error handler. Must keep the 4-argument signature so Express
 * recognizes it as error middleware.
 *
 * Only messages from `AppError` are exposed to the client; anything else is
 * reported as a generic 500 to avoid leaking internal details.
 */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : "Internal Server Error";

  if (!isProduction) {
    console.error("[error]", err);
  }

  res.status(statusCode).json({ message });
};
