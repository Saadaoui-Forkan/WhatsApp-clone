"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordSchema = exports.emailSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: "Name must be at least 3 characters long" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
});
exports.loginSchema = zod_1.z.object({
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
});
exports.emailSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
});
exports.passwordSchema = zod_1.z.object({
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
