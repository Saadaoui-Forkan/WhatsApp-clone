import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { Email, Password } from "../types/password.types.js";
import { handleError, validateData } from "../utils/common.js";
import { emailSchema, passwordSchema } from "../utils/validationSchema.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { getResetPasswordTemplate } from "../utils/htmlTemplate.js";
import { sendEmail } from "../utils/nodemailer.js";
import { CLIENT_DOMAIN } from "../utils/constantes.js";

/**
 *  @method  POST
 *  @route   /api/users/password/reset-password
 *  @desc    Send password reset link to user's email
 *  @access  public
*/
export const sendResetPasswordLink  = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Validate email format from request body
    const { email } = req.body as Email;
    const validationPassed = validateData(emailSchema, req, res);
    if (!validationPassed) return;
    // 2. Check if the user exists in the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res
        .status(404)
        .json({ message: "No account is associated with this email address." });
      return;
    }
    // 3. Create a new password reset token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const { hashToken } = await import("../utils/hashToken.js");
    const tokenHash = hashToken(rawToken);
    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        tokenHash,
        type: "password_reset",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1h
      },
    });
    // 4. Construct the reset password link
    const link = `${CLIENT_DOMAIN}/reset-password/${user.id}/${rawToken}`;
    // 5. Generate HTML email content and send the email
    const htmlTemplate = getResetPasswordTemplate(link);
    await sendEmail(user.email, "Reset Password", htmlTemplate);
    // 6. Return success response (generic)
    res
      .status(200)
      .json({
        message: "If an account exists with this email, a password reset link has been sent.",
      });
  } catch (err) {
    handleError(res, err as Error);
  }
};

/**
 *  @method  GET
 *  @route   /api/users/password/reset-password/:userId/:token
 *  @desc    Validates the reset password link by checking the user and token
 *  @access  public
*/
export const getResetPasswordLink = async (req: Request, res: Response): Promise<void> => {
  try{
    const { userId, token } = req.params;
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(400).json({ message: "The reset password link is invalid or has expired." });
      return;
    }
    // Validate the provided verification token
    const { hashToken } = await import("../utils/hashToken.js");
    const tokenHash = hashToken(token);
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        userId: user.id,
        tokenHash,
        type: "password_reset",
        expiresAt: { gt: new Date() },
      },
    });
    if (!verificationToken) {
      res.status(400).json({ message: "The reset password link is invalid or has expired." });
      return;
    }
    // If the token is valid, return a success response
    res.status(200).json({ message: "The reset password link is valid." });   
  } catch (err) {
    handleError(res, err as Error);
  }
};

/**
 *  @method  POST
 *  @route   /api/users/password/reset-password/:userId/:token
 *  @desc    Reset the user's password
 *  @access  public
*/
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate password format from request body
    const { password } = req.body as Password;
    const validationPassed = validateData(passwordSchema, req, res);
    if (!validationPassed) return;
    // Check if the user exists in the database
    const user = await prisma.user.findUnique({ where: { id: req.params.userId } });
    if (!user) {
      res
        .status(400)
        .json({ message: "No account is associated with this user." });
      return;
    }
    // Check if the token is valid
    const { hashToken } = await import("../utils/hashToken.js");
    const tokenHash = hashToken(req.params.token);
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        userId: user.id,
        tokenHash,
        type: "password_reset",
        expiresAt: { gt: new Date() },
      },
    });
    if (!verificationToken) {
      res
        .status(400)
        .json({ message: "The reset password link is invalid or has expired." });
      return;
    }

    if (!user.isAccountVerified) {
      await prisma.user.update({
       where: { id: user.id },
       data: { isAccountVerified: true },
     });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 12);
    
    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAccountVerified: true,
        profilePicture: true,
        bio: true,
      },
    });
    // Delete used token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
    // Return success response
    res.status(200).json({ message: "Password reset successfully." });
  } catch (err) {
    handleError(res, err as Error);
  }
}