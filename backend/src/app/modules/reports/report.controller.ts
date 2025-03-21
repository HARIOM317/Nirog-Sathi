import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReportService } from "./report.service";
import httpStatus from "http-status";
import { Report } from "@prisma/client";

// const uploadPdfReport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     // Pass the entire request object to the service
//     const result = await ReportService.uploadReport(req);
//     sendResponse<Report>(res, {
//         statusCode: httpStatus.OK,
//         message: 'Successfully Report Uploaded !!',
//         success: true,
//         data: result
//     });
// });

const uploadPdfReport = catchAsync(async (req: Request, res: Response) => {
  console.log("within controller Upload", req.file);
  const result = await ReportService.uploadReport(req);
  sendResponse<Report>(res, {
    statusCode: httpStatus.OK,
    message: "Successfully Report Uploaded !!",
    success: true,
    data: result,
  });
});


const getPatientReport = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.getPatientReport(req.params.id);
  sendResponse<Report[]>(res, {
    statusCode: httpStatus.OK,
    message: "Patient Report Retrieved Successfully",
    success: true,
    data: result
  });
});


export const ReportController = {
  uploadPdfReport,
  getPatientReport,
};
