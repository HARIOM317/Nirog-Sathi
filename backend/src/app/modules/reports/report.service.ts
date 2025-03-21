import { Report } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helpers/uploadHelper";
import { EmailtTransporter } from "../../../helpers/emailTransporter";
import * as path from "path";

const uploadReport = async (req: Request): Promise<Report | null | any> => {
  const file = req.file as IUpload;
  let uploadUrl = "";

  try {
    // Log the raw data for debugging
    const rawData = req.body["data"];
    console.log("Raw User Data:", rawData);

    // Validate the JSON string
    if (typeof rawData !== "string") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid data format");
    }

    const user = JSON.parse(rawData);
    console.log("Parsed User Data:", user);

    if (file) {
      const uploadPdf = await CloudinaryHelper.uploadFile(file);
      if (uploadPdf) {
        uploadUrl = uploadPdf.secure_url;
      } else {
        throw new ApiError(
          httpStatus.EXPECTATION_FAILED,
          "Failed to Upload Report"
        );
      }
    }

    const reportData = {
      ...user,
      uploadUrl,
    };
    console.log("Report Data:", reportData);

    const patientData = await prisma.patient.findUnique({
      where: { id: user.patientId },
    });

    const doctorData = await prisma.doctor.findUnique({
      where: { id: user.doctorId },
    });

    if (!patientData || !doctorData) {
      throw new ApiError(httpStatus.NOT_FOUND, "Patient or Doctor not found");
    }

    const result = await prisma.report.create({
      data: reportData,
    });

    const doctorName = `Dr. ${doctorData.firstName} ${doctorData.lastName}`;
    const toMail = patientData.email;
    const subject = "New Report Uploaded";
    const pathName = path.join(
      __dirname,
      "../../../../template/new_report.html"
    );
    const replacementObj = { doctorName, reportTitle: user.reportTitle };

    await EmailtTransporter({ pathName, replacementObj, toMail, subject });
    console.log("New report email sent successfully.");

    return result;
  } catch (error) {
    console.error("Error uploading report:", error);
    if (error instanceof SyntaxError) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid JSON format");
    } else if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }
};


const getPatientReport = async (id: string): Promise<Report[]> => {
  const result = await prisma.report.findMany({
      where: {
          patientId: id
      },include: {
        doctor: {
            select: {
                fullName: true,
                clinicName : true,
                clinicAddress : true,
                designation: true,
                specialization : true,
                img : true
            }
        },
        patient: {
          select: {
              firstName: true,
              lastName : true,
              bloodGroup : true,
              img : true,
          }
      }
    }
  });
  return result;
}


// const getBlog = async (id: string): Promise<Report| null> => {
//   const result = await prisma.report.findUnique({
//       where: { patientId : id },
      
//   });
//   return result;
// }



export const ReportService = {
  uploadReport,
  getPatientReport
};