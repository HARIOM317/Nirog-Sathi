import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Admin } from "@prisma/client";
import { AdminService } from "./admin.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.create(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Admin Created !!',
        success: true,
        data: result
    })
})

const getAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.getAdmin(req.params.id);
    sendResponse<Admin>(res, {
        statusCode: 200,
        message: 'Successfully Get Admin !!',
        success: true,
        data: result,
    })
})

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.deleteAdmin(req.params.id);
    sendResponse<Admin>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Admin !!',
        success: true,
        data: result,
    })
})

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.updateAdmin(req);
    sendResponse<Admin>(res, {
        statusCode: 200,
        message: 'Successfully Updated Doctor !!',
        success: true,
        data: result,
    })
})

export const AdminController = {
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmin
}