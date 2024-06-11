import { Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const fileUploader = catchAsync(async (req: any, res: Response) => {
    try {
        console.log('asdkf',req.formData);
        const image = req.file;
    
        let imagePath = "";
        if (image) {
          imagePath = image.path;
        }
    
        res.json({
          success: 1,
          file: {
            url: `http://localhost:3002/${imagePath}`,
          },
        });
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
});
const getFile = catchAsync(async (req: any, res: Response) => {
    try {
        console.log('asdkf',req.formData);
        const image = req.file;
    
        let imagePath = "";
        if (image) {
          imagePath = image.path;
        }
    
        res.json({
          success: 1,
          file: {
            url: `http://localhost:3002/${imagePath}`,
          },
        });
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
});


export const ImageUploader = {
    fileUploader,
    getFile
};