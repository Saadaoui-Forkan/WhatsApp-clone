import { Request, RequestHandler, Response } from "express";
import { loginSchema, registerSchema } from "../utils/validationSchema";
import { LoginUser, RegisterUser } from "../types/user.types";
import { handleError, validateData } from "../utils/common";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
const prisma = new PrismaClient();

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
    // Validation with zod
    const validationPassed = validateData(registerSchema, req, res);
    if (!validationPassed) return;
    // Check if user exist
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      res.status(400).json({ message: "User Already Exist" });
      return;
    }
    // Hash password
    const hashPassword = await bcrypt.hash(password, 15);
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
    // Generate token
    const token = generateToken(res, {
      id: newUser.id,
      email: newUser.email,
    });
    // Send data to database
    res.status(201).json({
      message: "User registered successfully",
      data: {
        name: newUser.name,
        token,
      },
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
    // Validation with zod
    const validationPassed = validateData(loginSchema, req, res);
    if (!validationPassed) return;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(res, {
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        message: "Welcome back",
        data: {
          name: user.name,
          token,
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
