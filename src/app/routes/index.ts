import express from 'express';
import { imageUploaderRoutes } from '../modules/academicDepartment/imageUploader.routes';

const router = express.Router();

const moduleRoutes = [ 
  {
    path: '/image',
    route: imageUploaderRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
