import {
  getResetPasswordLink,
  resetPassword,
  sendResetPasswordLink,
} from "../controllers/password.js";
import { Router } from "express";

const passwordRouter = Router();

passwordRouter.post("/reset-password", sendResetPasswordLink);
passwordRouter.get("/reset-password/:userId/:token", getResetPasswordLink);
passwordRouter.post("/reset-password/:userId/:token", resetPassword);

export default passwordRouter;