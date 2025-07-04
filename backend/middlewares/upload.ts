import path from "path";
import multer from "multer";

const __dirname = path.resolve();

// Photo Storage
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
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