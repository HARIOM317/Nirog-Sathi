import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Favourite } from "@prisma/client";
import { FavouritesService } from "./favourites.service";

const addFavourite = catchAsync(async (req: Request, res: Response) => {
    const result = await FavouritesService.createFavourite(req.user, req.body);
    sendResponse<Favourite>(res, {
        statusCode: 200,
        message: 'Successfully Add Favourite !!',
        success: true,
        data: result
    })
})

const removeFavourite = catchAsync(async (req: Request, res: Response) => {
    const result = await FavouritesService.removeFavourite(req.user, req.body);
    sendResponse<Favourite>(res, {
        statusCode: 200,
        message: 'Successfully Removed Favourite !!',
        success: true,
        data: result,
    })
})

const getPatientFavourites = catchAsync(async (req: Request, res: Response) => {
    const result = await FavouritesService.getPatientFavourites(req.user);
    sendResponse<Favourite[]>(res, {
        statusCode: 200,
        message: 'Successfully Retrieve Favourites !!',
        success: true,
        data: result,
    })
})

export const FavouriteController = {
    addFavourite,
    removeFavourite,
    getPatientFavourites
}
