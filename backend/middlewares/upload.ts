import multer from "multer";
import { AppError } from "../utils/AppError.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new AppError("Unsupported file format. Only images are allowed.", 400));
    }
  },
});

export default upload;

// Photo Storage
// const photoStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../images"));
//   },
//   filename: function (req, file, cb) {
//     if (file) {
//       cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//     } else {
//       cb(new Error("File upload error"), "")
//     }
//   },
// });

// Photo Upload Middleware
// export const photoUpload = multer({
//   storage: photoStorage,
//   fileFilter: function(req, file, cb) {
//       if (file.mimetype.startsWith("image")) {
//           cb(null, true)
//       } else {
//           cb(new Error("Unsupported File Format"))
//       }
//   },
//   limits: { fieldSize: 1024 * 1024 * 5 }
// })