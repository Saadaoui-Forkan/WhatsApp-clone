"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, userInfo) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiresIn = process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN;
    if (!secret || !expiresIn) {
        throw new Error("Missing ACCESS_TOKEN_SECRET or EXPIRES_IN in environment");
    }
    const accessToken = jsonwebtoken_1.default.sign({ userInfo }, secret, { expiresIn: Number(expiresIn) });
    res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });
    return accessToken;
};
exports.generateToken = generateToken;
