"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSocketAuth = exports.isAuth = void 0;
const common_1 = require("../utils/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ massage: "Unauthorized" });
            return;
        }
        const accessToken = token.split(" ")[1];
        const privateKey = process.env.ACCESS_TOKEN_SECRET;
        const decoded = jsonwebtoken_1.default.verify(accessToken, privateKey);
        req.user = decoded.userInfo;
        next();
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.isAuth = isAuth;
const isSocketAuth = (socket, next) => {
    const token = socket.handshake.query.token;
    if (!socket.handshake.query || !token) {
        return next(new Error("Authentication Invalid"));
    }
    try {
        const privateKey = process.env.ACCESS_TOKEN_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, privateKey);
        socket.data.userInfo = decoded.userInfo;
        next();
    }
    catch (e) {
        next(e);
    }
};
exports.isSocketAuth = isSocketAuth;
