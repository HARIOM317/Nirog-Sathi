import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { InterestedDoctorService } from "./interestedDoctor.service";
import { InterestedDoctor } from "@prisma/client";
import httpStatus from "http-status";

const createInterestedDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await InterestedDoctorService.create(req.body);
    sendResponse<InterestedDoctor>(res, {
        statusCode: httpStatus.CREATED,
        message: 'Interested doctor created successfully!',
        success: true,
        data: result
    });
});

const getAllInterestedDoctors = catchAsync(async (req: Request, res: Response) => {
    const result = await InterestedDoctorService.getAllInterestedDoctor();
    sendResponse<InterestedDoctor[]>(res, {
        statusCode: httpStatus.OK,
        message: 'Successfully retrieved all interested doctors!',
        success: true,
        data: result,
    });
});

const deleteInterestedDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await InterestedDoctorService.deleteInterestedDoctor(req.params.id);
    sendResponse<InterestedDoctor>(res, {
        statusCode: httpStatus.OK,
        message: 'Successfully deleted interested doctor!',
        success: true,
        data: result,
    });
});

export const InterestedDoctorController = {
    createInterestedDoctor,
    getAllInterestedDoctors,
    deleteInterestedDoctor
};
