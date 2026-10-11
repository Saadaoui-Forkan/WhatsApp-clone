import { Resend } from "resend";
import { AppError } from "./AppError.js";
import { env, isProduction } from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async (
  userEmail: string,
  subject: string,
  htmlTemplate: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_ADDRESS,
      to: [userEmail],
      subject: subject,
      html: htmlTemplate,
    });

    if (error) {
      throw error;
    }

    if (!isProduction) {
      console.log("Email Sent: " + data?.id);
    }
  } catch (error) {
    if (!isProduction) {
      console.error("Resend Error:", error);
    }
    // Surface a meaningful, operational error to the client instead of a
    // generic 500. The mail provider failing is an upstream issue.
    throw new AppError(
      "Could not send the email. Please try again later.",
      502,
      true
    );
  }
};