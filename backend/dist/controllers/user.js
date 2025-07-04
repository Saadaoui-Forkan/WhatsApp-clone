"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriends = exports.verifyAccount = exports.logout = exports.test = exports.login = exports.register = void 0;
const validationSchema_1 = require("../utils/validationSchema");
const common_1 = require("../utils/common");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = require("../utils/nodemailer");
const htmlTemplate_1 = require("../utils/htmlTemplate");
const index_1 = require("../index");
const prisma = new client_1.PrismaClient();
/**
 *  @method  POST
 *  @route   /api/users/register
 *  @desc    Create New User
 *  @access  public
*/
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validation with zod
        const validationPassed = (0, common_1.validateData)(validationSchema_1.registerSchema, req, res);
        if (!validationPassed)
            return;
        // Check if user exist
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
            res.status(400).json({ message: "User Already Exist" });
            return;
        }
        // Hash password
        const hashPassword = await bcrypt_1.default.hash(password, 15);
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
        const rawToken = crypto_1.default.randomBytes(32).toString("hex");
        const vtoken = await prisma.verificationToken.create({
            data: {
                userId: newUser.id,
                token: rawToken
            }
        });
        // Create the verification link
        const link = `${process.env.CLIENT_DOMAIN_URL}/users/${newUser.id}/verify/${vtoken.token}`;
        // Prepare the email content and send it
        const htmlTemplate = (0, htmlTemplate_1.getVerificationEmailTemplate)(link);
        await (0, nodemailer_1.sendEmail)(newUser.email, "Verify Your Email Address", htmlTemplate);
        // Respond with success message
        res.status(201).json({
            message: "Registration successful! Please verify your email address.",
        });
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.register = register;
/**
 *  @method  POST
 *  @route   /api/users/login
 *  @desc    Login user
 *  @access  public
*/
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation with zod
        const validationPassed = (0, common_1.validateData)(validationSchema_1.loginSchema, req, res);
        if (!validationPassed)
            return;
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && bcrypt_1.default.compareSync(password, user.password)) {
            // Check if email is verified
            if (!user.isAccountVerified) {
                res.status(400).json({ message: "Please verify your email address before logging in." });
                return;
            }
            // Generate authentication token
            const token = (0, generateToken_1.generateToken)(res, {
                id: user.id,
                email: user.email,
            });
            res.status(200).json({
                message: "Welcome back",
                data: {
                    id: user.id,
                    name: user.name,
                    bio: user.bio,
                    profilePicture: user.profilePicture,
                    token,
                },
            });
            return;
        }
        else {
            res.status(400).json({
                message: "Invalid Credentials!",
            });
            return;
        }
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.login = login;
/**
 *  @method  GET
 *  @route   /api/users/me
 *  @desc    Test protected route
 *  @access  private
*/
const test = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Not Authenticated" });
            return;
        }
        res.json({ user: req.user });
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.test = test;
/**
 * @desc    Logout User
 * @route   /api/users/logout
 * @method  POST
 * @access  private (only logged in users)
*/
const logout = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Not Authenticated" });
            return;
        }
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.logout = logout;
/**
 *  @method  GET
 *  @route   /api/users/:userId/verify/:token
 *  @desc    Verify Account
 *  @access  public
*/
const verifyAccount = async (req, res) => {
    try {
        const { userId, token } = req.params;
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            res.status(400).json({ message: "Invalid verification link." });
            return;
        }
        if (user?.isAccountVerified) {
            res.status(200).json({
                message: "Your account is already verified.",
                user,
            });
            return;
        }
        // Check if token exists for this user
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { userId: user?.id, token },
        });
        if (!verificationToken) {
            res.status(400).json({ message: "Invalid or expired verification link." });
            return;
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
        // Emit the event AFTER successful verification
        index_1.io.emit("user_created", updatedUser);
        // Respond with success
        res
            .status(200)
            .json({
            message: "Your account has been successfully verified.",
            user: updatedUser,
        });
    }
    catch (error) {
        (0, common_1.handleError)(res, error);
    }
};
exports.verifyAccount = verifyAccount;
/**
 *  @method  GET
 *  @route   /api/users/friends
 *  @desc    Get all users except the currently authenticated user (get friends)
 *  @access  private
*/
const getFriends = async (req, res) => {
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
        res.status(200).json({ friends });
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.getFriends = getFriends;
