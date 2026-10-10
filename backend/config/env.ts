import "dotenv/config";
import { z } from "zod";

/**
 * Treat empty-string env vars as "not provided".
 */
const optionalUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().url().optional()
);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8000),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS_TOKEN_SECRET is required"),
  ACCESS_TOKEN_SECRET_EXPIRES_IN: z
    .string()
    .min(1)
    .default("7d"),

  CLIENT_DEVELOPMENT_DOMAIN: optionalUrl,
  CLIENT_PRODUCTION_DOMAIN: optionalUrl,

  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),

  EMAIL_ADDRESS: z.string().email("EMAIL_ADDRESS must be a valid email address"),
  EMAIL_PASSWORD: z.string().min(1, "EMAIL_PASSWORD is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid or missing environment variables:\n");
  for (const issue of parsed.error.issues) {
    console.error(`   • ${issue.path.join(".") || "(root)"}: ${issue.message}`);
  }
  console.error("\nCheck your backend/.env file (see backend/.env.example).\n");
  process.exit(1);
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === "production";
