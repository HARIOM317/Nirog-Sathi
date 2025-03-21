import { Admin, Emergency, PrismaClient, Day } from "@prisma/client";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helpers/uploadHelper";
import { EmailtTransporter } from "../../../helpers/emailTransporter";
import * as path from 'path';
import moment from 'moment';
import { any } from "zod";

const prisma = new PrismaClient();

// model Emergency {
//     id           String         @id @default(uuid())
//     patientName  String
//     mobile       String
//     subject      String
//     city         String
//     address      String
//     createdAt    DateTime       @default(now())
//     updatedAt    DateTime       @updatedAt

//     @@map("Emergency")
//   }

interface EmergencyPayload {
    patientName: string;
    mobile: string;
    city: string;
    address: string;
    subject: string;
}

const createEmergency = async (payload: EmergencyPayload): Promise<Emergency | null | any> => {
    const { patientName, address, mobile, city, subject } = payload;

    if (!address || !patientName || !city || !mobile || !subject) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields!');
    }

    const currentDate = new Date(); // Get the current date and time
    const days: Day[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName: Day = days[currentDate.getDay()]; // Get the day of the week (0-6) and use it to index the days array
    // console.log(dayName); // Output the day name

    try {
        const findAmbulance = await prisma.ambulance.findFirst({
            where: {
                city: city,
                status: false,
            }
        });

        if (!findAmbulance) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'No available ambulance found!');
        }

        const DoctorTimeSlotData = await prisma.doctorTimeSlot.findMany({
            where: {
                day: dayName
            }
        });

        let replacementObjArray = [];


        for (const slot of DoctorTimeSlotData) {
            const doctorData = await prisma.doctor.findFirst({
                where: {
                    id: slot.doctorId,
                    specialization: subject
                }
            });

            if (doctorData) {
                const EmergencyRes = await prisma.emergency.create({
                    data: payload,
                });

                // Update the status of the ambulance in the database
                const updateAmbulance = await prisma.ambulance.update({
                    where: {
                        id: findAmbulance.id // Assuming you have an 'id' field in your ambulance model
                    },
                    data: {
                        status: true
                    }
                });

                const pathName = path.join(__dirname, '../../../../template/emergency.html');
                const emergencyObj = {
                    city: EmergencyRes.city,
                    patientName: EmergencyRes.patientName,
                    mobile: EmergencyRes.mobile,
                    address: EmergencyRes.address,
                    firstName : doctorData.firstName,
                    lastName: doctorData.lastName,
                    email : doctorData.email,
                    driverName : findAmbulance.driverName,
                    ambulanceNumber : findAmbulance.ambulanceNumber
                };
                replacementObjArray.push(emergencyObj); 
                const emailSubject = `You Booked for ${payload.patientName}`;
                const toMail = `${findAmbulance.email}`;
                await EmailtTransporter({ pathName, replacementObj : emergencyObj, toMail, subject: emailSubject });
                // console.log(replacementObjArray)
                // return replacementObj;
            }
        }

        // console.log(replacementObjArray);


        return replacementObjArray;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Unable to create Emergency!");
    }
}

const getAllEmergency = async (): Promise<Emergency[] | null> => {
    const result = await prisma.emergency.findMany();
    return result;
}

const getAmbulace = async (id: string): Promise<Emergency | null> => {
    const result = await prisma.emergency.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const deleteEmergency = async (id: string): Promise<Emergency | null> => {
    const result = await prisma.emergency.delete({
        where: {
            id: id
        }
    });
    return result;
}



const updateEmergency = async (req: Request): Promise<Admin> => {
    const file = req.file as IUpload;
    const id = req.params.id as string;
    const user = JSON.parse(req.body.data);

    if (file) {
        const uploadImage = await CloudinaryHelper.uploadFile(file);
        if (uploadImage) {
            user.img = uploadImage.secure_url
        } else {
            throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to Upload Image');
        }
    }
    const result = await prisma.admin.update({
        where: { id },
        data: user
    })
    return result;
}

export const EmergencyService = {
    createEmergency,
    updateEmergency,
    getAllEmergency,
    deleteEmergency,
    getAmbulace
}