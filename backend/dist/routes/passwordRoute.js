"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const password_1 = require("../controllers/password");
const express_1 = require("express");
const passwordRouter = (0, express_1.Router)();
passwordRouter.post("/reset-password", password_1.sendResetPasswordLink);
passwordRouter.get("/reset-password/:userId/:token", password_1.getResetPasswordLink);
passwordRouter.post("/reset-password/:userId/:token", password_1.resetPassword);
exports.default = passwordRouter;
