/**
 * Error type carrying an HTTP status code and an "operational" flag.
 *
 * Operational errors (bad input, auth failures, not found, ...) are expected
 * and their message is safe to expose to the client. Non-operational errors
 * (bugs, unexpected failures) are reported as a generic 500.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
