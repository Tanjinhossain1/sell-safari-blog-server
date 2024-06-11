import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const fileUploader = async (data: any): Promise<AcademicDepartment> => {
    const result = await prisma.academicDepartment.create({
        data,
        include: {
            academicFaculty: true
        }
    });

    console.log(data.file);
    // const image = data.file;

    // let imagePath = "";
    // if (image) {
    //   imagePath = image.path;
    // }

    // res.json({
    //   success: 1,
    //   file: {
    //     url: `http://localhost:4001/${imagePath}`,
    //   },
    // });

    return result;
};

export const AcademicDepartmentService = {
    fileUploader,
};