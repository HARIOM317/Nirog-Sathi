import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Admin, Ambulance } from "@prisma/client";
// import { AdminService } from "./admin.service";

import { AmbulanceService } from "./ambulance.service";

const createAmbulance = catchAsync(async (req: Request, res: Response) => {
    const result = await AmbulanceService.createAmbulance(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'SuccessfullyAmbulance Created !!',
        success: true,
        data: result
    })
})

const getAllAmbulance = catchAsync(async (req: Request, res: Response) => {
    const result = await AmbulanceService.getAllAmbulance();
    sendResponse<Ambulance[]>(res, {
        statusCode: 200,
        message: 'Successfully Retrieve All Ambulance !!',
        success: true,
        data: result,
    })
})

const getAmbulace = catchAsync(async (req: Request, res: Response) => {
    const result = await AmbulanceService.getAmbulace(req.params.id);
    sendResponse<Admin>(res, {
        statusCode: 200,
        message: 'Successfully Get Admin !!',
        success: true,
        // data: result,
    })
})


const deleteAmbulance = catchAsync(async (req: Request, res: Response) => {
    const result = await AmbulanceService.deleteAmbulance(req.params.id);
    sendResponse<Ambulance>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Ambulance !!',
        success: true,
        data: result,
    })
})

const updateAmbulance = catchAsync(async (req: Request, res: Response) => {
    const result = await AmbulanceService.updateAmbulance(req);
    sendResponse<Admin>(res, {
        statusCode: 200,
        message: 'Successfully Updated Doctor !!',
        success: true,
        data: result,
    })
})

export const AmbulaceController = {
    createAmbulance,
    updateAmbulance,
    deleteAmbulance,
    getAllAmbulance,
    getAmbulace
}