import rateLimit from "express-rate-limit";
import { isProduction } from "../config/env.js";
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
});
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: isProduction ? 20 : 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
});
export const resetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: isProduction ? 5 : 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
});
