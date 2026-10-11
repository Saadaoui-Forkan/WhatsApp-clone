import { handleError } from "../utils/common.js";
import jwt from "jsonwebtoken";
const extractTokenFromCookie = (cookieHeader) => {
    if (!cookieHeader)
        return null;
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    const jwtCookie = cookies.find((c) => c.startsWith("jwt="));
    return jwtCookie ? jwtCookie.slice(4) : null;
};
export const isAuth = (req, res, next) => {
    try {
        // Read JWT from httpOnly cookie
        const token = extractTokenFromCookie(req.headers.cookie);
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const privateKey = process.env.ACCESS_TOKEN_SECRET;
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded.userInfo;
        next();
    }
    catch (err) {
        handleError(res, err);
    }
};
export const isSocketAuth = (socket, next) => {
    try {
        // Read JWT from cookie in socket handshake headers
        const cookieHeader = socket.handshake.headers.cookie;
        const token = extractTokenFromCookie(cookieHeader);
        if (!token) {
            return next(new Error("Authentication Invalid"));
        }
        const privateKey = process.env.ACCESS_TOKEN_SECRET;
        const decoded = jwt.verify(token, privateKey);
        socket.data.userInfo = decoded.userInfo;
        next();
    }
    catch (e) {
        next(e);
    }
};
