import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
})

export const loginSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
})

export const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export const passwordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export const profileSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }).optional(),
  bio: z.string().max(500, { message: "Bio must be at most 500 characters" }).optional(),
}).refine((data) => data.name !== undefined || data.bio !== undefined, {
  message: "At least one of name or bio must be provided",
});

export const idParamSchema = z.object({
  id: z.string().min(1, { message: "Invalid id" }),
});

export const verifyParamsSchema = z.object({
  userId: z.string().min(1, { message: "Invalid userId" }),
  token: z.string().min(1, { message: "Invalid token" }),
});

export const resetParamsSchema = z.object({
  userId: z.string().min(1, { message: "Invalid userId" }),
  token: z.string().min(1, { message: "Invalid token" }),
});

export const cursorQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(30),
});

export const sendMessageSchema = z.object({
  receiverId: z.string().min(1, { message: "receiverId is required" }),
  content: z.string().max(4000, { message: "Message content must be at most 4000 characters" }).optional(),
  attachment: z.object({
    url: z.string().url(),
    publicId: z.string(),
    width: z.number().optional(),
    height: z.number().optional(),
    mime: z.string().optional(),
  }).optional(),
}).refine((data) => data.content !== undefined || data.attachment !== undefined, {
  message: "Message must have content or an attachment",
});
