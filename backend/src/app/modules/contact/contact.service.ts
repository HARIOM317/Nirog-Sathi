import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { Contact, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ContactPayload {
    email: string;
    firstName: string;
    lastName: string;
    subject: string;
    text: string;
}

const contactUs = async (payload: ContactPayload): Promise<Contact | null | any> => {
    const { email, firstName, lastName, subject, text } = payload;

    if (!email || !firstName || !lastName || !subject || !text) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Mising Email required fields!');
    }

    try {
        const contact_res = await prisma.contact.create({
            data: payload,
        });


    } catch (error) {
        throw new ApiError(httpStatus.NO_CONTENT, "Unable to send message !")
    }
}

const getAllContactUs = async (): Promise<Contact[] | null> => {
    console.log("mai call huaa ")
    const result = await prisma.contact.findMany();
    return result;
}

const deleteContactUs = async (id: string): Promise<Contact | null> => {
    const result = await prisma.contact.delete({
        where: {
            id: id
        }
    });
    return result;
}

export const ContactService = {
    contactUs,
    getAllContactUs,
    deleteContactUs
}
