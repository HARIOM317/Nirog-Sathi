import { Appointment, Favourite } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const createFavourite = async (user: any, payload: Favourite): Promise<Favourite> => {
    const isUserExist = await prisma.patient.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }

    //check already have or not
    const isFavourite = await prisma.favourite.findFirst({
        where: {
            doctorId: payload.doctorId
        }
    });

    if (isFavourite) {
        throw new ApiError(httpStatus.NOT_FOUND, 'AllReady doctor is Favourite !!')
    } else {
        payload.patientId = isUserExist.id;
        const favourites = await prisma.favourite.create({
            data: payload
        });
        return favourites;
    }
}
const removeFavourite = async (user: any, payload: Favourite): Promise<Favourite> => {
    const isUserExist = await prisma.patient.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }

    //check already have or not
    const isFavourite = await prisma.favourite.findFirst({
        where: {
            doctorId: payload.doctorId
        }
    });
    if(!isFavourite){
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor is not in Favourite !!')
    }else{
        const favourites = await prisma.favourite.delete({
            where: {
                id: isFavourite.id
            }
        })
        return favourites;
    }
}

const getPatientFavourites = async (user: any): Promise<Favourite[]> => {
    const isUserExist = await prisma.patient.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }

    const favourites = await prisma.favourite.findMany({
        where: {
            patientId: isUserExist.id
        },
        include: {
            doctor: true,
        }
    })
    return favourites;
}


export const FavouritesService = {
    createFavourite,
    removeFavourite,
    getPatientFavourites
}