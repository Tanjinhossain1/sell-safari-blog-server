import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CreateArticle } from './createArticle.controller';
import { createArticleValidation } from './createArticle.validatoin';

const router = express.Router();
 
router.get(
    '/all',
    CreateArticle.getAll
); 

router.post(
    '/create',
    validateRequest(createArticleValidation.create),
    CreateArticle.createArticle
); 


export const createArticleRoutes = router;