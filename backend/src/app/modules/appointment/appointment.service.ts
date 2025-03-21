import { Appointment, Patient, Payment, PaymentStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import moment from 'moment';
import { EmailtTransporter } from "../../../helpers/emailTransporter";
import * as path from 'path';
import config from "../../../config";
import { Prescription } from "@prisma/client";

const createAppointment = async (payload: any): Promise<Appointment | null | any> => {

    const { patientInfo, payment } = payload;
    if (patientInfo.patientId) {
        const isUserExist = await prisma.patient.findUnique({
            where: {
                id: patientInfo.patientId
            }
        })
        if (!isUserExist) {
            patientInfo['patientId'] = null
        }
    }

    const isDoctorExist = await prisma.doctor.findUnique({
        where: {
            id: patientInfo.doctorId
        }
    });

    if (!isDoctorExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    const { orderId, paymentId, paymentType } = payment;

    if (paymentType === "razorpay") {
        patientInfo['paymentStatus'] = PaymentStatus.paid;
    }

    const result = await prisma.$transaction(async (tx) => {
        const previousAppointment = await tx.appointment.findFirst({
            orderBy: { createdAt: 'desc' },
            take: 1
        });
        const appointmentLastNumber = (previousAppointment?.trackingId ?? '').slice(-3);
        const lastDigit = (Number(appointmentLastNumber) + 1 || 0).toString().padStart(3, '0');

        // Trcking Id To be ==> First 3 Letter Of User  + current year + current month + current day + unique number (Matched Previous Appointment).
        const first3DigitName = patientInfo?.firstName?.slice(0, 3).toUpperCase();
        const year = moment().year();
        const month = (moment().month() + 1).toString().padStart(2, '0');
        const day = (moment().dayOfYear()).toString().padStart(2, '0');
        const trackingId = first3DigitName + year + month + day + lastDigit || '001';
        patientInfo['trackingId'] = trackingId;

        const appointment = await tx.appointment.create({
            data: patientInfo,
            include: {
                doctor: true,
                patient: true
            }
        });

        const docFee = Number(isDoctorExist.price);
        const gst = (5 / 100) * docFee;
        const totalAmount = docFee + 10 + gst;
        if (appointment.id) {
            await tx.payment.create({
                data: {
                    appointmentId: appointment.id,
                    bookingFee: 10,
                    paymentType: paymentType,
                    paymentId: paymentId,
                    orderId: orderId,
                    gst: gst,
                    doctorFee: docFee,
                    totalAmount: totalAmount,
                }
            })
        }
        const pathName = path.join(__dirname, '../../../../template/appointment.html')
        const appointmentObj = {
            created: moment(appointment.createdAt).format('LL'),
            trackingId: appointment.trackingId,
            patientType: appointment.patientType,
            status: appointment.status,
            paymentStatus: appointment.paymentStatus,
            prescriptionStatus: appointment.prescriptionStatus,
            scheduleDate: moment(appointment.scheduleDate).format('LL'),
            scheduleTime: appointment.scheduleTime,
            doctorImg: appointment?.doctor?.img,
            doctorFirstName: appointment?.doctor?.firstName,
            doctorLastName: appointment?.doctor?.lastName,
            specialization: appointment?.doctor?.specialization,
            designation: appointment?.doctor?.designation,
            college: appointment?.doctor?.college,
            patientImg: appointment?.patient?.img,
            patientfirstName: appointment?.patient?.firstName,
            patientLastName: appointment?.patient?.lastName,
            dateOfBirth: moment().diff(moment(appointment?.patient?.dateOfBirth), 'years'),
            bloodGroup: appointment?.patient?.bloodGroup,
            city: appointment?.patient?.city,
            state: appointment?.patient?.state,
            country: appointment?.patient?.country
        }
        const replacementObj = appointmentObj;
        const subject = `Appointment Confirm With Dr ${appointment?.doctor?.firstName + ' ' + appointment?.doctor?.lastName} at ${appointment.scheduleDate} + ' ' + ${appointment.scheduleTime}`
        const toMail = `${appointment.email + ',' + appointment.doctor?.email}`;
        EmailtTransporter({ pathName, replacementObj, toMail, subject })
        return appointment;
    });
    return result;
}

const createAppointmentByUnAuthenticateUser = async (payload: any): Promise<Appointment | null> => {
    const { patientInfo, payment } = payload;
    if (patientInfo.patientId) {
        const isUserExist = await prisma.patient.findUnique({
            where: {
                id: patientInfo.patientId
            }
        })
        if (!isUserExist) {
            patientInfo['patientId'] = null
        }
    }

    const result = await prisma.$transaction(async (tx) => {
        const previousAppointment = await tx.appointment.findFirst({
            orderBy: { createdAt: 'desc' },
            take: 1
        });

        const appointmentLastNumber = (previousAppointment?.trackingId ?? '').slice(-3);
        const lastDigit = (Number(appointmentLastNumber) + 1).toString().padStart(3, '0')
        // Trcking Id To be ==> UNU - 'Un Authenticate User  + current year + current month + current day + unique number (Matched Previous Appointment).
        const year = moment().year();
        const month = (moment().month() + 1).toString().padStart(2, '0');
        const day = (moment().dayOfYear()).toString().padStart(2, '0');
        const trackingId = 'UNU' + year + month + day + lastDigit || '0001';
        patientInfo['trackingId'] = trackingId;

        const appointment = await tx.appointment.create({
            data: patientInfo,
        });
        const { PaymentId, paymentType } = payment;
        const vat = (15 / 100) * (60 + 10)
        if (appointment.id) {
            await tx.payment.create({
                data: {
                    appointmentId: appointment.id,
                    bookingFee: 10,
                    paymentId: PaymentId,
                    paymentType: paymentType,
                    gst: vat,
                    doctorFee: 60,
                    totalAmount: (vat + 60),
                }
            })
        }

        const appointmentObj = {
            created: moment(appointment.createdAt).format('LL'),
            trackingId: appointment.trackingId,
            patientType: appointment.patientType,
            status: appointment.status,
            paymentStatus: appointment.paymentStatus,
            prescriptionStatus: appointment.prescriptionStatus,
            scheduleDate: moment(appointment.scheduleDate).format('LL'),
            scheduleTime: appointment.scheduleTime,
        }
        const pathName = path.join(__dirname, '../../../../template/meeting.html')
        const replacementObj = appointmentObj;
        const subject = `Appointment Confirm at ${appointment.scheduleDate} ${appointment.scheduleTime}`

        const toMail = `${appointment.email}`;
        EmailtTransporter({ pathName, replacementObj, toMail, subject })
        return appointment;
    })

    return result;
}


const cancelAppointment = async (id: string): Promise<any> => {
    try {
        // Fetch the appointment details
        const appointmentData = await prisma.appointment.findUnique({
            where: { id: id },
            include: { patient: true } // Assuming the appointment has a relation to the patient
        });

        // console.log("Appointment data:", appointmentData);

        if (!appointmentData) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
        }


        // Delete the associated payment record
        await prisma.payment.deleteMany({
            where: { appointmentId: id }
        });

        // console.log("Payment details delete huyi hai :)")

        // Delete the appointment
        const result = await prisma.appointment.delete({
            where: { id: id }
        });

        // console.log("Deleted appointment:", result);

        // Send a cancellation email to the patient
        const toMail = `${appointmentData.email}`;
        const subject = 'Appointment Cancellation';
        const pathName = path.join(__dirname, '../../../../template/cancellation.html');
        const replacementObj = { appointmentDate: appointmentData.scheduleDate, appointmentTime: appointmentData.scheduleTime, patientName: appointmentData.firstName + " " + appointmentData.lastName };

        try {
            await EmailtTransporter({ pathName, replacementObj, toMail, subject });
            console.log("Cancellation email sent successfully.");
        } catch (err) {
            console.log(err);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unable to send cancellation email!');
        }

        return result;
    } catch (error) {
        console.log("Error occurred during cancellation:", error);
        throw error;
    }
};



const getAllAppointments = async (): Promise<Appointment[] | null> => {
    const result = await prisma.appointment.findMany();
    return result;
}

const getAppointment = async (id: string): Promise<Appointment | null> => {
    const result = await prisma.appointment.findUnique({
        where: {
            id: id
        },
        include: {
            doctor: true,
            patient: true,
        }
    });
    return result;
}

const getAppointmentByTrackingId = async (data: any): Promise<Appointment | null> => {
    const { id } = data;

    const result = await prisma.appointment.findUnique({
        where: {
            trackingId: id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true,
                    college: true,
                    degree: true,
                    img: true
                },
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    address: true,
                    city: true,
                    country: true,
                    state: true,
                    img: true
                }
            }
        }
    });
    return result;
}

const getPatientAppointmentById = async (user: any): Promise<Appointment[] | null> => {
    const { userId } = user;
    const isPatient = await prisma.patient.findUnique({
        where: {
            id: userId
        }
    })
    if (!isPatient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const result = await prisma.appointment.findMany({
        where: {
            patientId: userId
        },
        include: {
            doctor: true
        }
    })
    return result;
}

const getPaymentInfoViaAppintmentId = async (id: string): Promise<any> => {
    const result = await prisma.payment.findFirst({
        where: {
            appointmentId: id
        },
        include: {
            appointment: {
                include: {
                    patient: {
                        select: {
                            firstName: true,
                            lastName: true,
                            address: true,
                            country: true,
                            city: true
                        }
                    },
                    doctor: {
                        select: {
                            firstName: true,
                            lastName: true,
                            address: true,
                            country: true,
                            city: true
                        }
                    }
                }
            }
        }
    });
    return result;
}

const getPatientPaymentInfo = async (user: any): Promise<any[]> => {
    const { userId } = user;
    console.log("user:", user);

    // Check if the user is a patient
    const isUserExist = await prisma.patient.findUnique({
        where: { id: userId },
    });
    console.log("patient exists:", isUserExist);

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Patient Account is not found !!");
    }

    // Fetch appointments related to the patient
    const appointments = await prisma.appointment.findMany({
        where: { patientId: isUserExist.id },
        include: {
            payments: true,
        },
    });
    console.log("appointments:", appointments);

    if (appointments.length === 0) {
        return []; // No appointments found for this patient
    }

    // Fetch payment information directly related to the appointments
    const appointmentIds = appointments.map((appointment) => appointment.id);
    console.log("appointmentIds:", appointmentIds);

    const result = await prisma.payment.findMany({
        where: {
            appointmentId: {
                in: appointmentIds,
            },
        },
        include: {
            appointment: {
                include: {
                    doctor: {
                        select: {
                            firstName: true,
                            lastName: true,
                            designation: true,
                            img: true,
                            specialization: true,
                        },
                    },
                },
            },
        },
    });

    console.log("result:", result);
    return result;
};

const getDoctorInvoices = async (user: any): Promise<any[] | null> => {
    const { userId } = user;

    // Check if the user is a doctor
    const isUserExist = await prisma.doctor.findUnique({
        where: { id: userId },
    });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Doctor Account is not found !!");
    }

    // Fetch appointments related to the patient
    const appointments = await prisma.appointment.findMany({
        where: { doctorId: isUserExist.id },
        include: {
            payments: true,
        },
    });
    console.log("appointments:", appointments);

    if (appointments.length === 0) {
        return []; // No appointments found for this patient
    }

    // Fetch payment information directly related to the appointments
    const appointmentIds = appointments.map((appointment) => appointment.id);
    console.log("appointmentIds:", appointmentIds);

    // Fetch payments related to the doctor's appointments
    const result = await prisma.payment.findMany({
        where: {
            appointmentId: {
                in: appointmentIds,
            },
        },
        include: {
            appointment: {
                include: {
                    patient: {
                        select: {
                            firstName: true,
                            lastName: true,
                            img: true,
                        },
                    },
                },
            },
        },
    });

    return result;
};

const deleteAppointment = async (id: string): Promise<any> => {
    const result = await prisma.appointment.delete({
        where: {
            id: id
        }
    });
    return result;
}

const updateAppointment = async (id: string, payload: Partial<Appointment>): Promise<Appointment> => {
    const result = await prisma.appointment.update({
        data: payload,
        where: {
            id: id
        }
    })
    return result;
}

//doctor Side
const getAppointmentsByDoctorId = async (id: string): Promise<Appointment | null | any> => {
    const result = await prisma.appointment.findMany({
        where: {
            doctorId: id
        },
        include: {
            doctor: true
        }
    });
    return result;
}

const getDoctorAppointmentsById = async (user: any, filter: any): Promise<Appointment[] | null> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) { throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!') }

    let andCondition: any = { doctorId: userId };

    if (filter.sortBy == 'today') {
        const today = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const tomorrow = moment(today).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');

        andCondition.scheduleDate = {
            gte: today,
            lt: tomorrow
        }
    }
    if (filter.sortBy == 'upcoming') {
        const upcomingDate = moment().startOf('day').add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        andCondition.scheduleDate = {
            gte: upcomingDate
        }
    }
    const whereConditions = andCondition ? andCondition : {}

    const result = await prisma.appointment.findMany({
        where: whereConditions,
        include: {
            patient: true,
            prescriptions: {
                select: {
                    id: true
                }
            }
        }
    });
    return result;
}

const getDoctorPatients = async (user: any): Promise<Patient[]> => {
    const { userId } = user;

    console.log("user : ",user)
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    const patients = await prisma.appointment.findMany({
        where: {
            doctorId: userId
        },
        distinct: ['patientId']
    });

    //extract patients from the appointments table
    const patientIds = patients.map(appointment => appointment.patientId);
    const patientList = await prisma.patient.findMany({
        where: {
            id: {
                // @ts-ignore
                in: patientIds
            }
        }
    })
    return patientList;
}

const updateAppointmentByDoctor = async (user: any, payload: Partial<Appointment>): Promise<Appointment | null> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.appointment.update({
        where: {
            id: payload.id
        },
        data: payload
    })
    return result;
}



const getDoctorPatientsHistory = async (user: any): Promise<Prescription[] | null> => {
    const { userId } = user;

    // Check if the user is a doctor
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!');
    }

    // Find the first appointment with medical history for the doctor
    const appointment = await prisma.appointment.findFirst({
        where: {
            doctorId: userId,
            medicalHistory: "yes",
            patientId: { not: null }
        },
        select: {
            patientId: true
        }
    });

    // If no appointment found, return an empty array
    if (!appointment) {
        return [];
    }

    // Find prescriptions for the patient
    const patientsPrescriptions = await prisma.prescription.findMany({
        where: {
            patientId: appointment.patientId as string
        },
        include: {
            medicines: true,
            appointment: {
                select: {
                    scheduleDate: true,
                    scheduleTime: true,
                    status: true,
                    trackingId: true,
                    firstName: true,
                    lastName: true,
                    address: true,
                    email: true,
                    phone: true,
                    patientType: true,
                    paymentStatus: true,
                    prescriptionStatus: true,
                    description: true,
                }
            },
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true,
                    email: true,
                    college: true,
                    address: true,
                    country: true,
                    state: true,
                    specialization: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    gender: true,
                    dateOfBirth: true,
                    email: true,
                    bloodGroup: true,
                    address: true,
                    img: true,
                    city: true,
                    country: true,
                    state: true,
                }
            }
        }
    });

    // Return the prescriptions
    return patientsPrescriptions;
};



export const AppointmentService = {
    createAppointment,
    getAllAppointments,
    getAppointment,
    deleteAppointment,
    cancelAppointment,
    updateAppointment,
    getPatientAppointmentById,
    getDoctorAppointmentsById,
    updateAppointmentByDoctor,
    getDoctorPatients,
    getPaymentInfoViaAppintmentId,
    getPatientPaymentInfo,
    getDoctorInvoices,
    createAppointmentByUnAuthenticateUser,
    getAppointmentByTrackingId,
    getAppointmentsByDoctorId,
    getDoctorPatientsHistory
}
