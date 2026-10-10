import { Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { UserPayload } from "../types/user.types.js";
import { env, isProduction } from "../config/env.js";

/**
 * Convert a duration string ("30m", "1h", "7d", "2w", "5000") to milliseconds.
 * Falls back to 7 days when the format is not recognized.
 */
const parseDurationToMs = (value: string): number => {
  const match = /^(\d+)\s*(ms|s|m|h|d|w)?$/.exec(value.trim());
  if (!match) return 7 * 24 * 60 * 60 * 1000;

  const amount = Number(match[1]);
  const factors = {
    ms: 1,
    s: 1_000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
    w: 604_800_000,
  } as const;
  const unit = (match[2] ?? "ms") as keyof typeof factors;

  return amount * factors[unit];
};

export const generateToken = (res: Response, userInfo: UserPayload): string => {
  const accessToken = jwt.sign({ userInfo }, env.ACCESS_TOKEN_SECRET, {
    // The duration string (e.g. "7d") is passed straight through to jsonwebtoken.
    expiresIn: env.ACCESS_TOKEN_SECRET_EXPIRES_IN as SignOptions["expiresIn"],
  });

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: parseDurationToMs(env.ACCESS_TOKEN_SECRET_EXPIRES_IN),
    path: "/",
  });

  return accessToken;
};
