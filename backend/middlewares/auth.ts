import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/common";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/user.types";

export const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ massage: "Unauthorized" });
      return;
    }

    const accessToken = token.split(" ")[1];
    const privateKey = process.env.ACCESS_TOKEN_SECRET as string;
    const decoded = jwt.verify(accessToken, privateKey) as JwtPayload;

    req.user = decoded.userInfo;
    next();
  } catch (err) {
    handleError(res, err as Error);
  }
};
