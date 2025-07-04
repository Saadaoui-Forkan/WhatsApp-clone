"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.getResetPasswordLink = exports.sendResetPasswordLink = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("../utils/common");
const validationSchema_1 = require("../utils/validationSchema");
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const htmlTemplate_1 = require("../utils/htmlTemplate");
const nodemailer_1 = require("../utils/nodemailer");
const prisma = new client_1.PrismaClient();
/**
 *  @method  POST
 *  @route   /api/users/password/reset-password
 *  @desc    Send password reset link to user's email
 *  @access  public
*/
const sendResetPasswordLink = async (req, res) => {
    try {
        // 1. Validate email format from request body
        const { email } = req.body;
        const validationPassed = (0, common_1.validateData)(validationSchema_1.emailSchema, req, res);
        if (!validationPassed)
            return;
        // 2. Check if the user exists in the database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res
                .status(404)
                .json({ message: "No account is associated with this email address." });
            return;
        }
        // 3. Check if a verification token already exists for this user
        let verificationToken = await prisma.verificationToken.findUnique({
            where: { userId: user.id },
        });
        // If no token exists, create a new one
        if (!verificationToken) {
            const rawToken = crypto_1.default.randomBytes(32).toString("hex");
            verificationToken = await prisma.verificationToken.create({
                data: {
                    userId: user?.id,
                    token: rawToken,
                },
            });
        }
        // 4. Construct the reset password link
        const link = `${process.env.CLIENT_DOMAIN_URL}/reset-password/${user.id}/${verificationToken.token}`;
        // 5. Generate HTML email content and send the email
        const htmlTemplate = (0, htmlTemplate_1.getResetPasswordTemplate)(link);
        await (0, nodemailer_1.sendEmail)(user.email, "Reset Password", htmlTemplate);
        // 6. Return success response
        res
            .status(200)
            .json({
            message: "A password reset link has been sent to your email address.",
        });
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.sendResetPasswordLink = sendResetPasswordLink;
/**
 *  @method  GET
 *  @route   /api/users/password/reset-password/:userId/:token
 *  @desc    Validates the reset password link by checking the user and token
 *  @access  public
*/
const getResetPasswordLink = async (req, res) => {
    try {
        const { userId, token } = req.params;
        // Check if the user exists
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "The requested user does not exist." });
            return;
        }
        // Validate the provided verification token
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                userId: user.id,
                token: token,
            },
        });
        if (!verificationToken) {
            res.status(400).json({ message: "The reset password link is invalid or has expired." });
            return;
        }
        // If the token is valid, return a success response
        res.status(200).json({ message: "The reset password link is valid." });
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.getResetPasswordLink = getResetPasswordLink;
/**
 *  @method  POST
 *  @route   /api/users/password/reset-password/:userId/:token
 *  @desc    Reset the user's password
 *  @access  public
*/
const resetPassword = async (req, res) => {
    try {
        // Validate password format from request body
        const { password } = req.body;
        const validationPassed = (0, common_1.validateData)(validationSchema_1.passwordSchema, req, res);
        if (!validationPassed)
            return;
        // Check if the user exists in the database
        const user = await prisma.user.findUnique({ where: { id: req.params.userId } });
        if (!user) {
            res
                .status(400)
                .json({ message: "No account is associated with this user." });
            return;
        }
        // Check if the token is valid
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                userId: user.id,
                token: req.params.token,
            },
        });
        if (!verificationToken) {
            res
                .status(400)
                .json({ message: "The reset password link is invalid or has expired." });
            return;
        }
        if (!user.isAccountVerified) {
            user.isAccountVerified = true;
        }
        // Hash password
        const hashPassword = await bcrypt_1.default.hash(password, 15);
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
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.resetPassword = resetPassword;
