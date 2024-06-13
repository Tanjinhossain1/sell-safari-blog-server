import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CreateArticleService } from './createArticle.service';

const createArticle = catchAsync(async (req: Request, res: Response) => {
    const result = await CreateArticleService.createArticle(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Article created successfully',
        data: result
    });
}); 

const getAll = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, [
        'searchTerm',
        'id',
        'academicFacultyId'
    ]);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await CreateArticleService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Article successfully',
        meta: result.meta,
        data: result.data
    });
}); 

export const CreateArticle = {
    createArticle,
    getAll, 
};