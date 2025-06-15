import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/common";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/user.types";
import { ExtendedError, Socket } from "socket.io";

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

export const isSocketAuth = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const token = socket.handshake.query.token as string
  if(!socket.handshake.query || !token) {
    return next(new Error("Authentication Invalid"))
  }
  try {
    const privateKey = process.env.ACCESS_TOKEN_SECRET as string;
    const decoded = jwt.verify(token, privateKey) as JwtPayload
    socket.data.userInfo = decoded.userInfo
    next()
  } catch (e) {
    next(e as ExtendedError)
  }
}
 