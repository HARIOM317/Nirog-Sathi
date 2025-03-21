// import { Admin, UserRole, Ambulance } from "@prisma/client";
import { Admin, UserRole, Ambulance, PrismaClient } from "@prisma/client";
// import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";
import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helpers/uploadHelper";
import { log } from "console";



const prisma = new PrismaClient();


// model Ambulance {
//     id           String         @id @default(uuid())
//     driverName  String
//     mobile       String
//     email      String
//     city         String
//     ambulanceNumber      String
//     status        Boolean?       @default(false)
//     createdAt    DateTime?       @default(now())
//     updatedAt    DateTime       @updatedAt

//     @@map("Ambulance")
//   }

interface AmbulancePayload {
    driverName: string;
    email: string;
    mobile: string;
    city: string;
    ambulanceNumber: string;
    // subject: string; // Add subject field here
}


const createAmbulance = async (payload: AmbulancePayload): Promise<Ambulance | null | any> => {
    const { driverName, email, mobile, city, ambulanceNumber} = payload;
    // console.log({payload});
    if (!email || !driverName || !city || !ambulanceNumber || !mobile) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Missing required fields!');
    }

    try {
        const ambulanceRes = await prisma.ambulance.create({
            data: payload,
        });
    } catch (error) {
        throw new ApiError(httpStatus.NO_CONTENT, "Unable to create ambulance!");
    }
}


const getAllAmbulance = async (): Promise<Ambulance[] | null> => {
    const result = await prisma.ambulance.findMany();
    return result;
}

const getAmbulace = async (id: string): Promise<Ambulance | null> => {
    const result = await prisma.ambulance.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const deleteAmbulance = async (id: string): Promise<Ambulance | null> => {
    const result = await prisma.ambulance.delete({
        where: {
            id: id
        }
    });
    return result;
}



const updateAmbulance = async (req: Request): Promise<Admin> => {
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

export const AmbulanceService = {
    createAmbulance,
    updateAmbulance,
    getAllAmbulance,
    deleteAmbulance,
    getAmbulace
}