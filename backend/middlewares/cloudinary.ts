import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export default cloudinary;

// export const cloudinaryUploadImage = async(fileToUpload: string) => {
//   try {
//       const data = await cloudinary.uploader.upload(fileToUpload, {
//           resource_type: 'auto',   
//       })
//       return data
//   } catch (error) {
//       console.log(error)
//       throw new Error('Internal Server Error (cloudinary)')
//   }
// }

// export const cloudinaryRemoveImage = async(imagePublicId: string ) => {
//   try {
//       const result = await cloudinary.uploader.destroy(imagePublicId)
//       return result
//   } catch (error) {
//       console.log(error)
//       throw new Error('Internal Server Error (cloudinary)')
//   }
// }