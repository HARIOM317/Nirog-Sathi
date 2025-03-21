import { Admin, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import ApiError from "../../../errors/apiError";
        
import httpStatus from "http-status";
import { Request } from "express";
import { IUpload } from "../../../interfaces/file";
import { CloudinaryHelper } from "../../../helpers/uploadHelper";


const create = async (payload: any): Promise<any> => {
    const data = await prisma.$transaction(async (tx) => {
        const { password, ...othersData } = payload;
        const existEmail = await tx.auth.findUnique({ where: { email: othersData.email } });
        if (existEmail) {
            throw new Error("Email Already Exist !!")
        }
        const admin = await tx.admin.create({ data: othersData });
        await tx.auth.create({
            data: {
                email:admin.email,
                password: password && await bcrypt.hashSync(password, 12),
                role: UserRole.admin,
                userId:admin.id
            },
        });
        return admin
    });

    return data;

}

const getAdmin = async (id: string): Promise<Admin | null> => {
    const result = await prisma.admin.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const deleteAdmin = async (id: string): Promise<any> => {
    const result = await prisma.$transaction(async (tx) => {
        const admin = await tx.admin.delete({
            where: {
                id: id
            }
        });
        await tx.auth.delete({
            where: {
                email: admin.email
            }
        })
    });
    return result;
}

const updateAdmin = async (req: Request): Promise<Admin> => {
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

export const AdminService = {
    create,
    updateAdmin,
    deleteAdmin,
    getAdmin
}