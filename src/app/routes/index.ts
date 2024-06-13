import express from 'express';
import { createArticleRoutes } from '../modules/createArticle/createArticle.routes';

const router = express.Router();

const moduleRoutes = [ 
  {
    path: '/article',
    route: createArticleRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
