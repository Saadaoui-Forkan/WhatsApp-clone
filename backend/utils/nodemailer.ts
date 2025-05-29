import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
  ...(process.env.NODE_ENV !== 'production' && {
    tls: {
      rejectUnauthorized: false,
    },
  }),
});

export const sendEmail = async (
  userEmail: string,
  subject: string,
  htmlTemplate: string
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent: " + info.response);
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw new Error("Nodemailer Error");
  }
};
