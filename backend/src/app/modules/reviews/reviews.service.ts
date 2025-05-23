import { Review } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import calculatePagination, { IOption } from "../../../shared/paginationHelper";

const create = async (user: any, payload: Review): Promise<Review> => {
    const isUserExist = await prisma.patient.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const isDoctorExist = await prisma.doctor.findUnique({
        where: {
            id: payload.doctorId
        }
    })
    if(isUserExist){
        payload.patientId = isUserExist.id;
    }
    if (!isDoctorExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.review.create({
        data: payload
    })
    return result
}

const getAllReviews = async (options: IOption): Promise<Review[] | null> => {
    const limit = Number(options.limit) || 10;
    const result = await prisma.review.findMany({
        take: limit,
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    img: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    img: true
                }
            }
        }
    });
    return result;
}

const getSingleReview = async (id: string): Promise<Review | null> => {
    const result = await prisma.review.findUnique({
        where: {
            id: id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    img: true
                }
            }
        }
    });
    return result;
}

const getDoctorReviews = async (id: string): Promise<Review[] | null> => {
    const isUserExist = await prisma.doctor.findUnique({
        where: {
            id: id
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.review.findMany({
        where: {
            doctorId: isUserExist.id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    img: true,
                }
            }
        }
    });
    return result;
}

const deleteReviews = async (id: string): Promise<Review> => {
    const result = await prisma.review.delete({
        where: {
            id: id
        }
    });
    return result;
}

const updateReview = async (id: string, payload: Partial<Review>): Promise<Review> => {
    const result = await prisma.review.update({
        data: payload,
        where: {
            id: id
        }
    })
    return result;
}

const replyReviewByDoctor = async (user: any, id: string, payload: Partial<Review>): Promise<Review> => {
    const isUserExist = await prisma.doctor.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    const result = await prisma.review.update({
        data: {
            response: payload.response
        },
        where: {
            id: id
        }
    })
    return result;
}


export const ReviewService = {
    create,
    getAllReviews,
    getDoctorReviews,
    deleteReviews,
    updateReview,
    getSingleReview,
    replyReviewByDoctor
}