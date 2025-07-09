import { Request, Response } from "express";
import { handleError } from "../utils/common.js";
import { PrismaClient } from "@prisma/client";
import { ProfileInfo } from "../types/profile.types.js";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { cloudinaryRemoveImage, cloudinaryUploadImage } from "../middlewares/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

/**
 *  @method  PUT
 *  @route   /api/profile/:id
 *  @desc    Update user profile (name & bio)
 *  @access  private (only user himself)
*/
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => { 
  try { 
    if (req.user.id !== req.params.id) {
      res.status(404).json({ message: "Profile not found" });
      return
    }

    const profile = await prisma.user.findUnique({ where: { id: req.user.id } }) 
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return
    }

    const {name, bio} = req.body as ProfileInfo
    const updateProfileInfo = await prisma.user.update({
      where: { id: req.user.id },
      data: {
          name,
          bio,
      },
      select: {
        id: true,
        name: true,
        bio: true,
      }
    })
    res.status(200).json({
      message: 'Profile info updated successfully.',
      updateProfileInfo
    });
  } catch (err) {
    handleError(res, err as Error);
  }
};

/**
 *  @method  PUT
 *  @route   /api/profile/:id/profile-photo
 *  @desc    Update user profile (name & bio)
 *  @access  private (only user himself)
*/
export const updateProfilePhoto = async (
  req: Request,
  res: Response
): Promise<void> => { 
  try { 
    // Check if the user is authorized to update this profile
    if (req.user.id !== req.params.id) {
      res.status(403).json({ message: "Unauthorized: You are not allowed to update this profile." });
      return
    }
    // Check if an image file was uploaded
    if (!req.file) {
      res.status(400).json({ message: "No image file uploaded." })
      return
    } 
    // Build the local path to the uploaded image
    const imagePath = path.join(
      process.env.NODE_ENV === "production" ? "/tmp" : path.join(__dirname, "../images"),
      req.file.filename
    );
    // Upload the image to Cloudinary
    const uploadResult = await cloudinaryUploadImage(imagePath)
    // Remove the local image file after upload
    await fs.unlink(imagePath);
    // Retrieve the user from the database
    const profile = await prisma.user.findUnique({ where: { id: req.user.id } }) 
    if (!profile) {
      res.status(404).json({ message: "User not found" });
      return
    }
    // If the user already has a profile picture, remove it from Cloudinary
    const profilePicture = profile.profilePicture as { publicId: string; secureUrl: string };
    if (profilePicture?.publicId) {
      await cloudinaryRemoveImage(profilePicture.publicId);
    }
    // Update the user's profile with the new profile picture
    const updatedProfilePhoto = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        profilePicture: {
          publicId: uploadResult.public_id,
          secureUrl: uploadResult.secure_url
        }
      },
      select: {
        id: true,
        name: true,
        profilePicture: true
      }
    });
    // Return a success response with updated user info
    res.status(200).json({
      updatedProfilePhoto,
      message: "Profile photo updated successfully."
    });
  } catch (err) {
    handleError(res, err as Error);
  }
};