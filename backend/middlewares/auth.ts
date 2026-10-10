import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/common.js";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/user.types.js";
import { ExtendedError, Socket } from "socket.io";

const extractTokenFromCookie = (cookieHeader: string | undefined): string | null => {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const jwtCookie = cookies.find((c) => c.startsWith("jwt="));
  return jwtCookie ? jwtCookie.slice(4) : null;
};

export const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Read JWT from httpOnly cookie
    const token = extractTokenFromCookie(req.headers.cookie);
    
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const privateKey = process.env.ACCESS_TOKEN_SECRET as string;
    const decoded = jwt.verify(token, privateKey) as JwtPayload;

    req.user = decoded.userInfo;
    next();
  } catch (err) {
    handleError(res, err as Error);
  }
};

export const isSocketAuth = (socket: Socket, next: (err?: ExtendedError) => void) => {
  try {
    // Read JWT from cookie in socket handshake headers
    const cookieHeader = socket.handshake.headers.cookie;
    const token = extractTokenFromCookie(cookieHeader);
    
    if (!token) {
      return next(new Error("Authentication Invalid"));
    }
    
    const privateKey = process.env.ACCESS_TOKEN_SECRET as string;
    const decoded = jwt.verify(token, privateKey) as JwtPayload;
    socket.data.userInfo = decoded.userInfo;
    next();
  } catch (e) {
    next(e as ExtendedError);
  }
};
 