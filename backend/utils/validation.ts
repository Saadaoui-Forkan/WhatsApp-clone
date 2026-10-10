import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>, source: "body" | "params" | "query" = "body") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = (req as any)[source];
    const result = schema.safeParse(data);
    if (!result.success) {
      res.status(400).json({
        message: result.error.issues.map(
          (err) => `${err.path}: ${err.message}`
        ),
      });
      return;
    }
    (req as any)[source] = result.data;
    next();
  };
};
