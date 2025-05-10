import { Response } from "express";
import jwt from "jsonwebtoken";
import { UserInfo } from "../types/user.types";

export const generateToken = (res: Response, userInfo: UserInfo): string => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiresIn = process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error("Missing ACCESS_TOKEN_SECRET or EXPIRES_IN in environment");
  }
  const accessToken = jwt.sign({ userInfo }, secret, { expiresIn: Number(expiresIn) });

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return accessToken
};