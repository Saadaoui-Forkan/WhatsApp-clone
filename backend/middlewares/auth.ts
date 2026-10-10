import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/common.js";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/user.types.js";
import { ExtendedError, Socket } from "socket.io";

export const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const accessToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    const privateKey = process.env.ACCESS_TOKEN_SECRET as string;
    const decoded = jwt.verify(accessToken, privateKey) as JwtPayload;

    req.user = decoded.userInfo;
    next();
  } catch (err) {
    handleError(res, err as Error);
  }
};

export const isSocketAuth = (socket: Socket, next: (err?: ExtendedError) => void) => {
  try {
    const token = (socket.handshake.query?.token as string | undefined) ?? socket.handshake.auth?.token as string | undefined;
    if (!token) {
      return next(new Error("Authentication Invalid"));
    }
    const privateKey = process.env.ACCESS_TOKEN_SECRET as string;
    const decoded = jwt.verify(token, privateKey) as JwtPayload
    socket.data.userInfo = decoded.userInfo
    next()
  } catch (e) {
    next(e as ExtendedError)
  }
}
 