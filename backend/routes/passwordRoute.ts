import {
  getResetPasswordLink,
  resetPassword,
  sendResetPasswordLink,
} from "../controllers/password.js";
import { Router } from "express";
import { resetLimiter } from "./rateLimiters.js";

const passwordRouter = Router();

passwordRouter.post("/reset-password", resetLimiter, sendResetPasswordLink);
passwordRouter.get("/reset-password/:userId/:token", getResetPasswordLink);
passwordRouter.post("/reset-password/:userId/:token", resetLimiter, resetPassword);

export default passwordRouter;