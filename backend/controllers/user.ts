import { Request, RequestHandler, Response } from "express";
import { LoginUser, RegisterUser } from "../types/user.types.js";
import { handleError } from "../utils/common.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { env, isProduction } from "../config/env.js";
import crypto from "crypto"
import { sendEmail } from "../utils/resend.js";
import { getVerificationEmailTemplate } from "../utils/htmlTemplate.js";
import { CLIENT_DOMAIN } from "../utils/constantes.js";
import { hashToken } from "../utils/hashToken.js";

// Socket.io instance will be injected to avoid circular dependency
let socketIO: any = null;

export const setSocketIO = (io: any) => {
  socketIO = io;
};

/**
 *  @method  POST
 *  @route   /api/users/register
 *  @desc    Create New User
 *  @access  public
*/
export const register: RequestHandler<any, any, RegisterUser> = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body as RegisterUser;
    // Check if user exist
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      res.status(400).json({ message: "User Already Exist" });
      return;
    }
    // Hash password
    const hashPassword = await bcrypt.hash(password, 12);
    // Create new user in database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
      select: {
        name: true,
        id: true,
        email: true,
      },
    });
    // Generate an email verification token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashToken(rawToken);
    const vtoken = await prisma.verificationToken.create({
      data: {
        userId: newUser.id,
        tokenHash,
        type: "email_verify",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      }
    })
    // Create the verification link
    const link = `${CLIENT_DOMAIN}/users/${newUser.id}/verify/${rawToken}`
    // Prepare the email content and send it
    const htmlTemplate = getVerificationEmailTemplate(link);
    await sendEmail(newUser.email, "Verify Your Email Address", htmlTemplate);

    // Respond with success message
    res.status(201).json({
      message: "Registration successful! Please verify your email address.",
    });
  } catch (err) {
    handleError(res, err as Error);
  }
};

/**
 *  @method  POST
 *  @route   /api/users/login
 *  @desc    Login user
 *  @access  public
*/
export const login: RequestHandler<any, any, LoginUser> = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body as LoginUser;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Check if email is verified
      if (!user.isAccountVerified) {
        res.status(400).json({ message: "Please verify your email address before logging in." });
        return;
      }
      // Generate authentication token (sets httpOnly cookie)
      generateToken(res, {
        id: user.id,
        email: user.email,
      });
      // Respond WITHOUT token in body
      res.status(200).json({
        message: "Welcome back",
        data: {
          id: user.id,
          name: user.name,
          bio: user.bio,
          profilePicture: user.profilePicture,
        },
      });
      return;
    } else {
      res.status(400).json({
        message: "Invalid Credentials!",
      });
      return;
    }
  } catch (err) {
    handleError(res, err as Error);
  }
};
 
/**
 *  @method  GET
 *  @route   /api/users/me
 *  @desc    Get current authenticated user
 *  @access  private
 */
export const getMe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not Authenticated" });
      return;
    }

    // Fetch fresh user data from database
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        profilePicture: true,
        isAccountVerified: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ user });
  } catch (err) {
    handleError(res, err as Error);
  }
};

/**
 * @desc    Logout User
 * @route   /api/users/logout
 * @method  POST
 * @access  private (only logged in users)
*/

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not Authenticated" });
      return;
    }

    res.cookie("jwt", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      expires: new Date(0),
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    handleError(res, err as Error);
  }
};

/**
 *  @method  GET
 *  @route   /api/users/:userId/verify/:token
 *  @desc    Verify Account
 *  @access  public
*/
export const verifyAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, token } = req.params
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        profilePicture: true,
        isAccountVerified: true,
      }
    });
    if (!user) {
      res.status(400).json({ message: "Invalid verification link." })
      return
    }
    if (user?.isAccountVerified) {
      res.status(200).json({
        message: "Your account is already verified.",
      });
      return
    }
    // Check if token exists for this user
    const tokenHash = hashToken(token);
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        userId: user?.id,
        tokenHash,
        type: "email_verify",
        expiresAt: { gt: new Date() },
      },
    });
    if (!verificationToken) {
      res.status(400).json({ message: "Invalid or expired verification link." })
      return
    }
    // Mark account as verified
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isAccountVerified: true,
      },
      select: { 
        id: true, 
        name: true, 
        email: true,
        bio: true,
        profilePicture: true
      }
    });
    // Delete used token
    await prisma.verificationToken.delete({
      where: { id: verificationToken?.id },
    });
    // Emit the event AFTER successful verification (targeted)
    if (socketIO) {
      socketIO.to(userId).emit("user_created", updatedUser);
    }
    // Respond with success
    res
      .status(200)
      .json({
        message: "Your account has been successfully verified.",
        user: updatedUser,
      });
  } catch (error) {
    handleError(res, error as Error)
  }
}

/**
 *  @method  GET
 *  @route   /api/users/friends
 *  @desc    Get all users except the currently authenticated user (get friends)
 *  @access  private
*/
export const getFriends = async (
  req: Request,
  res: Response
): Promise<void> => { 
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not Authenticated" });
      return; 
    }
    const currentUserId = req.user.id;

    const friends = await prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: { id: currentUserId },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        profilePicture: true,
      },
    });
    
    res.status(200).json({ friends })
  } catch (err) {
    handleError(res, err as Error);
  }
};