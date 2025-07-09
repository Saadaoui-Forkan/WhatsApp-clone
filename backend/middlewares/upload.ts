import path from "path";
import multer, { FileFilterCallback } from "multer";
import { fileURLToPath } from "url";
import fs from "fs";
import { Request } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === "production";
const uploadDir = isProduction ? "/tmp" : path.join(__dirname, "../images");

if (!isProduction && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const photoStorage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, uploadDir);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(new Error("File upload error"), "");
    }
  },
});

export const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported File Format"));
    }
  },
  limits: { fieldSize: 1024 * 1024 * 5 },
});