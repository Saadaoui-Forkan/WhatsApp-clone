"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoUpload = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const currentDir = path_1.default.resolve();
// Photo Storage
const photoStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(currentDir, "../images"));
    },
    filename: function (req, file, cb) {
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
        }
        else {
            cb(new Error("File upload error"), "");
        }
    },
});
// Photo Upload Middleware
exports.photoUpload = (0, multer_1.default)({
    storage: photoStorage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {
            cb(new Error("Unsupported File Format"));
        }
    },
    limits: { fieldSize: 1024 * 1024 * 5 }
});
