import { handleError } from "../utils/common.js";
import { prisma } from "../lib/prisma.js";
import cloudinary from "../middlewares/cloudinary.js";
/**
 *  @method  PUT
 *  @route   /api/profile/:id
 *  @desc    Update user profile (name & bio)
 *  @access  private (only user himself)
*/
export const updateProfile = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not Authenticated" });
            return;
        }
        const userId = req.user.id;
        if (userId !== req.params.id) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        const profile = await prisma.user.findUnique({ where: { id: userId } });
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        const { name, bio } = req.body;
        const updateProfileInfo = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                bio,
            },
            select: {
                id: true,
                name: true,
                bio: true,
            }
        });
        res.status(200).json({
            message: 'Profile info updated successfully.',
            updateProfileInfo
        });
    }
    catch (err) {
        handleError(res, err);
    }
};
/**
 *  @method  PUT
 *  @route   /api/profile/:id/profile-photo
 *  @desc    Update user profile (name & bio)
 *  @access  private (only user himself)
*/
export const updateProfilePhoto = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not Authenticated" });
            return;
        }
        const userId = req.user.id;
        // Check if the user is authorized to update this profile
        if (userId !== req.params.id) {
            res.status(403).json({ message: "Unauthorized: You are not allowed to update this profile." });
            return;
        }
        // Check if an image file was uploaded
        const image = req.file;
        if (!image) {
            res.status(400).json({ message: "No image file uploaded." });
            return;
        }
        // Upload the image to Cloudinary
        const base64 = image.buffer.toString("base64");
        const mimeType = image.mimetype;
        const uploadResponse = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64}`);
        // Retrieve the user from the database
        const profile = await prisma.user.findUnique({ where: { id: userId } });
        if (!profile) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // If the user already has a profile picture, remove it from Cloudinary
        const profilePicture = profile.profilePicture;
        if (profilePicture?.publicId) {
            await cloudinary.uploader.destroy(profilePicture.publicId);
        }
        // Update the user's profile with the new profile picture
        const updatedProfilePhoto = await prisma.user.update({
            where: { id: userId },
            data: {
                profilePicture: {
                    publicId: uploadResponse.public_id,
                    secureUrl: uploadResponse.secure_url
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
    }
    catch (err) {
        handleError(res, err);
    }
};
