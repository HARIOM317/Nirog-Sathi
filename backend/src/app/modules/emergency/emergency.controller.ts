import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Admin, Emergency } from "@prisma/client";

import { EmergencyService } from "./emergency.services";

const createEmergency = catchAsync(async (req: Request, res: Response) => {
    const result = await EmergencyService.createEmergency(req.body);
    console.log(result);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Emergency Created !!',
        success: true,
        data: result
    })
})

const getAllEmergency = catchAsync(async (req: Request, res: Response) => {
    const result = await EmergencyService.getAllEmergency();
    sendResponse<Emergency[]>(res, {
        statusCode: 200,
        message: 'Successfully Retrieve All Emergency !!',
        success: true,
        data: result,
    })
})

const getEmergency = catchAsync(async (req: Request, res: Response) => {
    const result = await EmergencyService.getAmbulace(req.params.id);
    sendResponse<Admin>(res, {
        statusCode: 200,
        message: 'Successfully Get Emergency !!',
        success: true,
        // data: result,
    })
})


const deleteEmergency = catchAsync(async (req: Request, res: Response) => {
    const result = await EmergencyService.deleteEmergency(req.params.id);
    sendResponse<Emergency>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Emergency !!',
        success: true,
        data: result,
    })
})

const updateEmergency = catchAsync(async (req: Request, res: Response) => {
    const result = await EmergencyService.updateEmergency(req);
    sendResponse<Admin>(res, {
        statusCode: 200,
        message: 'Successfully Updated Emergency !!',
        success: true,
        data: result,
    })
})

export const EmergencyController = {
    createEmergency,
    updateEmergency,
    deleteEmergency,
    getAllEmergency,
    getEmergency
}