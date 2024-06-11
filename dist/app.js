"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const http_status_1 = __importDefault(require("http-status"));
const https_1 = __importDefault(require("https")); // or 'https' for https:// URLs
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
const config_1 = __importDefault(require("./config"));
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
const app = (0, express_1.default)();
// const upload = multer({ dest: 'uploads/' }); // specify your uploads directory
// Configure Multer storage with custom filename including extension
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${(0, uuid_1.v4)()}-${Date.now()}`;
        const extension = path_1.default.extname(file.originalname);
        cb(null, `${uniqueSuffix}${extension}`);
    },
});
const upload = (0, multer_1.default)({ storage });
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files from the 'uploads' directory
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
app.use('/api/v1', routes_1.default);
//global error handler
app.use(globalErrorHandler_1.default);
// Helper function to catch async errors
const catchAsync = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const fileUploader = catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Uploaded file:', req.file);
        const image = req.file;
        let imagePath = '';
        if (image) {
            imagePath = `uploads/${image.filename}`; // Use the filename provided by multer
        }
        res.json({
            success: 1,
            file: {
                url: `http://localhost:${config_1.default.port}/${imagePath}`,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}));
app.post('/api/v1/image/upload', upload.single('file'), fileUploader);
// Route to handle image uploads by URL
app.post('/api/v1/image/upload/byUrl', catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        if (!url) {
            throw new Error('No URL provided');
        }
        const name = Date.now().toString();
        const imagePath = path_1.default.join('uploads/', `${name}.jpg`);
        const file = fs_1.default.createWriteStream(imagePath);
        https_1.default.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                console.log('Download Complete');
                file.close();
                res.json({
                    success: 1,
                    file: {
                        url: `http://localhost:${config_1.default.port}/${imagePath}`,
                    },
                });
            });
        }).on('error', (err) => {
            fs_1.default.unlink(imagePath, () => {
                console.error('Error downloading file:', err);
                res.status(400).json({ error: err.message });
            });
        });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(400).json({ error: error.message });
    }
})));
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
