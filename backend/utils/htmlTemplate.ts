export const getVerificationEmailTemplate = (link: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
      <h2 style="text-align: center; color: #573d7d;">Welcome to Chat App!</h2>
      <p style="font-size: 16px; color: #333;">
        Thank you for registering. Please click the button below to verify your email address:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" 
          style="background-color: #573d7d; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px;">
          Verify Email
        </a>
      </div>
      <p style="font-size: 14px; color: #555;">
        If you didn't create an account, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} 
        <a
          href="https://personal-portfolio-six-pearl-25.vercel.app/en"
          target="_blank"
        >
          Mahmoud Saadaoui
        </a>
      </p>
    </div>
  `;
};

export const getResetPasswordTemplate = (link: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
      <h2 style="text-align: center; color: #573d7d;">Welcome to Chat App!</h2>
      <h4 style="text-align: center; color: #573d7d; font-weight: bold;">Reset Your Password</h4>
      <p style="font-size: 10px; color: #333;">
        We received a request to reset your password. Click the button below to choose a new password:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" 
          style="background-color: #573d7d; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #555;">
        If you didn’t request a password reset, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} 
        <a
          href="https://personal-portfolio-six-pearl-25.vercel.app/en"
          target="_blank"
        >
          Mahmoud Saadaoui
        </a>
      </p>
    </div>
  `;
};