import { Request, Response } from "express";
import { handleError } from "../utils/common.js";
import { prisma } from "../lib/prisma.js";
import cloudinary from "../middlewares/cloudinary.js";
import { AppError } from "../utils/AppError.js";

/**
 *  @method  POST
 *  @route   /api/messages/attachment
 *  @desc    Upload message attachment (image) to Cloudinary
 *  @access  private
 */
export const uploadAttachment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not Authenticated" });
      return;
    }

    const image = req.file;
    if (!image) {
      res.status(400).json({ message: "No image file uploaded." });
      return;
    }

    // Validate file type
    if (!image.mimetype.startsWith("image/")) {
      res.status(400).json({ message: "File must be an image." });
      return;
    }

    // Upload to Cloudinary
    const base64 = image.buffer.toString("base64");
    const mimeType = image.mimetype;
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${base64}`,
      {
        folder: "chat-attachments",
        transformation: [
          { width: 1200, crop: "limit", quality: "auto" },
        ],
      }
    );

    const attachment = {
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      width: uploadResponse.width,
      height: uploadResponse.height,
      mime: mimeType,
    };

    res.status(200).json({ attachment });
  } catch (err) {
    handleError(res, err as Error);
  }
};