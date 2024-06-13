import { CreateArticle, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { createArticleSearchableFields } from './createArticle.contants';

const createArticle = async (data: Prisma.CreateArticleCreateInput): Promise<CreateArticle> => {
    const result = await prisma.createArticle.create(
        { data }
    );
    console.log('created article', result)
    return result;
};
const getAll = async (filters: any,
    options: IPaginationOptions): Promise<IGenericResponse<CreateArticle[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: createArticleSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    

    const whereConditions: Prisma.CreateArticleWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.createArticle.findMany({
       
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    createdAt: 'desc'
                }
    });
    const total = await prisma.createArticle.count({
        where: whereConditions
    });

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
};

export const CreateArticleService = {
    createArticle,
    getAll,
};