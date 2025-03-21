import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { InterestedDoctor } from "@prisma/client";

// Create an interested doctor
const create = async (payload: {
    email: string;
    fullName: string;
    address: string;
    mobileNumber: string;
}): Promise<InterestedDoctor> => {
    const { email, fullName, address, mobileNumber } = payload;

    if (!email || !fullName || !address || !mobileNumber) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields!');
    }

    try {
        const result = await prisma.interestedDoctor.create({
            data: payload,
        });
        return result;
    } catch (error) {
        console.error("Error creating interested doctor:", error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Unable to create interested doctor!");
    }
};

// Get all interested doctors
const getAllInterestedDoctor = async (): Promise<InterestedDoctor[]> => {
    try {
        const result = await prisma.interestedDoctor.findMany();
        return result;
    } catch (error) {
        console.error("Error fetching interested doctors:", error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Unable to fetch interested doctors!");
    }
};

// Delete an interested doctor by ID
const deleteInterestedDoctor = async (id: string): Promise<InterestedDoctor> => {
    try {
        const result = await prisma.interestedDoctor.delete({
            where: {
                id: id
            }
        });
        return result;
    } catch (error) {
        console.error("Error deleting interested doctor:", error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Unable to delete interested doctor!");
    }
}

export const InterestedDoctorService = {
    create,
    getAllInterestedDoctor,
    deleteInterestedDoctor
}
