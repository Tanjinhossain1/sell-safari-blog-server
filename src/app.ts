import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import fs from "fs";
import httpStatus from 'http-status';
import https from "https"; // or 'https' for https:// URLs
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

import cookieParser from 'cookie-parser';
import multer from 'multer';

import path from 'path';
import { v4 as uuidv4 } from 'uuid';
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import config from "./config";
  

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const app: Application = express();
// const upload = multer({ dest: 'uploads/' }); // specify your uploads directory
// Configure Multer storage with custom filename including extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  },
});
 
const upload = multer({ storage });
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api/v1', routes);


//global error handler
app.use(globalErrorHandler);


// Helper function to catch async errors
const catchAsync = (fn: any) => (req: Request, res: Response, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const fileUploader = catchAsync(async (req: any, res: Response) => {
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
        url: `https://sell-safari-blog-server.onrender.com:${config.port}/${imagePath}`,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


app.post('/api/v1/image/upload', upload.single('file'), fileUploader);


// Route to handle image uploads by URL
app.post('/api/v1/image/upload/byUrl', catchAsync(async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      throw new Error('No URL provided');
    }

    const name = Date.now().toString();
    const imagePath = path.join('uploads/', `${name}.jpg`);
    const file = fs.createWriteStream(imagePath);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        console.log('Download Complete');
        file.close();
        res.json({
          success: 1,
          file: {
            url: `https://sell-safari-blog-server.onrender.com:${config.port}/${imagePath}`,
          },
        });
      });
    }).on('error', (err) => {
      fs.unlink(imagePath, () => {
        console.error('Error downloading file:', err);
        res.status(400).json({ error: err.message });
      });
    });
  } catch (error: any) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
}));
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
