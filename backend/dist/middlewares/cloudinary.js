"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryRemoveImage = exports.cloudinaryUploadImage = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const cloudinaryUploadImage = async (fileToUpload) => {
    try {
        const data = await cloudinary_1.v2.uploader.upload(fileToUpload, {
            resource_type: 'auto',
        });
        return data;
    }
    catch (error) {
        console.log(error);
        throw new Error('Internal Server Error (cloudinary)');
    }
};
exports.cloudinaryUploadImage = cloudinaryUploadImage;
const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        const result = await cloudinary_1.v2.uploader.destroy(imagePublicId);
        return result;
    }
    catch (error) {
        console.log(error);
        throw new Error('Internal Server Error (cloudinary)');
    }
};
exports.cloudinaryRemoveImage = cloudinaryRemoveImage;
