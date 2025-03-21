import express from 'express';
import { InterestedDoctorController } from './interestedDoctor.controller';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';

const router = express.Router();
router.get('/', auth(AuthUser.ADMIN), InterestedDoctorController.getAllInterestedDoctors);
router.post('/', InterestedDoctorController.createInterestedDoctor);
router.delete('/:id', auth(AuthUser.ADMIN), InterestedDoctorController.deleteInterestedDoctor);

export const interestedDoctorRouter = router;