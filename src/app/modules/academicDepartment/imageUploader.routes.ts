import express from 'express';
import { ImageUploader } from './imageUploader.controller';

const router = express.Router();

router.get('/uploads/:id', ImageUploader.getFile);
// router.get('/:id', AcademicDepartmentController.getByIdFromDB);

router.post(
    '/', 
    ImageUploader.fileUploader
); 


export const imageUploaderRoutes = router;