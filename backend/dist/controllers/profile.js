"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePhoto = exports.updateProfile = void 0;
const common_1 = require("../utils/common");
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const cloudinary_1 = require("../middlewares/cloudinary");
const prisma = new client_1.PrismaClient();
/**
 *  @method  PUT
 *  @route   /api/profile/:id
 *  @desc    Update user profile (name & bio)
 *  @access  private (only user himself)
*/
const updateProfile = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        const profile = await prisma.user.findUnique({ where: { id: req.user.id } });
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return;
        }
        const { name, bio } = req.body;
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
        });
        res.status(200).json({
            message: 'Profile info updated successfully.',
            updateProfileInfo
        });
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.updateProfile = updateProfile;
/**
 *  @method  PUT
 *  @route   /api/profile/:id/profile-photo
 *  @desc    Update user profile (name & bio)
 *  @access  private (only user himself)
*/
const updateProfilePhoto = async (req, res) => {
    try {
        // Check if the user is authorized to update this profile
        if (req.user.id !== req.params.id) {
            res.status(403).json({ message: "Unauthorized: You are not allowed to update this profile." });
            return;
        }
        // Check if an image file was uploaded
        if (!req.file) {
            res.status(400).json({ message: "No image file uploaded." });
            return;
        }
        // Build the local path to the uploaded image
        const imagePath = path_1.default.join(__dirname, `../images/${req.file.filename}`);
        // Upload the image to Cloudinary
        const uploadResult = await (0, cloudinary_1.cloudinaryUploadImage)(imagePath);
        // Remove the local image file after upload
        await promises_1.default.unlink(imagePath);
        // Retrieve the user from the database
        const profile = await prisma.user.findUnique({ where: { id: req.user.id } });
        if (!profile) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // If the user already has a profile picture, remove it from Cloudinary
        const profilePicture = profile.profilePicture;
        if (profilePicture?.publicId) {
            await (0, cloudinary_1.cloudinaryRemoveImage)(profilePicture.publicId);
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
    }
    catch (err) {
        (0, common_1.handleError)(res, err);
    }
};
exports.updateProfilePhoto = updateProfilePhoto;
