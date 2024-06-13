import { z } from 'zod';

const create = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required'
        }),
        category: z.string({
            required_error: 'category required'
        }),
        // description: z.string({
        //     required_error: 'description required'
        // }),
        image: z.string({
            required_error: 'Image required'
        }),
        content: z.array(z.object({}).passthrough()),

    })
});

export const createArticleValidation = {
    create,
};