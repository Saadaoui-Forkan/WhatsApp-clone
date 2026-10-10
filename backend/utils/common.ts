import { Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "./AppError.js";
import { isProduction } from "../config/env.js";

export const handleError = (res: Response, err: Error) => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError
    ? err.message
    : "Internal Server Error";

  if (!isProduction) {
    console.error("[error]", err);
  }

  res.status(statusCode).json({ message });
};

export const validateData = (schema: ZodType<any>, req: Request, res: Response) => {
  const validation = schema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: validation.error.issues.map(
        (err) => `${err.path}: ${err.message}`
      ),
    });
    return false;
  }
  return true;
};
