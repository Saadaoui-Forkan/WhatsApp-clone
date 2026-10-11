import jwt from "jsonwebtoken";
import { env, isProduction } from "../config/env.js";
/**
 * Convert a duration string ("30m", "1h", "7d", "2w", "5000") to milliseconds.
 * Falls back to 7 days when the format is not recognized.
 */
const parseDurationToMs = (value) => {
    const match = /^(\d+)\s*(ms|s|m|h|d|w)?$/.exec(value.trim());
    if (!match)
        return 7 * 24 * 60 * 60 * 1000;
    const amount = Number(match[1]);
    const factors = {
        ms: 1,
        s: 1_000,
        m: 60_000,
        h: 3_600_000,
        d: 86_400_000,
        w: 604_800_000,
    };
    const unit = (match[2] ?? "ms");
    return amount * factors[unit];
};
export const generateToken = (res, userInfo) => {
    const accessToken = jwt.sign({ userInfo }, env.ACCESS_TOKEN_SECRET, {
        // The duration string (e.g. "7d") is passed straight through to jsonwebtoken.
        expiresIn: env.ACCESS_TOKEN_SECRET_EXPIRES_IN,
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
