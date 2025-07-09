import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Determine destination based on environment
const isProduction = process.env.NODE_ENV === "production";
const uploadDir = isProduction ? "/tmp" : path.join(__dirname, "../images");

// ✅ Ensure uploadDir exists (only needed in dev)
if (!isProduction && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Photo Storage
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(new Error("File upload error"), "")
    }
  },
});

// Photo Upload Middleware
export const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function(req, file, cb) {
      if (file.mimetype.startsWith("image")) {
          cb(null, true)
      } else {
          cb(new Error("Unsupported File Format"))
      }
  },
  limits: { fieldSize: 1024 * 1024 * 5 }
})