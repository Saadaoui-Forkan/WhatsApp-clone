"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
    ...(process.env.NODE_ENV !== 'production' && {
        tls: {
            rejectUnauthorized: false,
        },
    }),
});
const sendEmail = async (userEmail, subject, htmlTemplate) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: userEmail,
            subject: subject,
            html: htmlTemplate,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email Sent: " + info.response);
    }
    catch (error) {
        console.error("Nodemailer Error:", error);
        throw new Error("Nodemailer Error");
    }
};
exports.sendEmail = sendEmail;
