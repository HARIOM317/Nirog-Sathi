import express, { NextFunction, Request, Response } from 'express';
import { DoctorController } from './doctor.controller';
import { AuthUser } from '../../../enums';
import { auth } from '../../middlewares/auth';
import { CloudinaryHelper } from '../../../helpers/uploadHelper';

const router = express.Router();

router.get('/', DoctorController.getAllDoctors);
router.post('/', DoctorController.createDoctor);
router.post('/admin/addDoctor',auth(AuthUser.ADMIN), DoctorController.addDoctor);
router.get('/:id', DoctorController.getDoctor);
router.delete('/:id', auth(AuthUser.ADMIN) || auth(AuthUser.DOCTOR), DoctorController.deleteDoctor);
router.patch('/:id',
    CloudinaryHelper.upload.single('file'),
    auth(AuthUser.DOCTOR),
    (req: Request, res: Response, next: NextFunction) => {
        return DoctorController.updateDoctor(req, res, next);
    }
);

export const DoctorRouter = router;