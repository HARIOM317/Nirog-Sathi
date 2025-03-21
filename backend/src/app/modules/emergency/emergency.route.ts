import express, { NextFunction, Request, Response } from 'express';
import { AuthUser } from '../../../enums';
import { auth } from '../../middlewares/auth';
import { EmergencyController } from './emergency.controller';

const router = express.Router();

router.post('/',  EmergencyController.createEmergency);
router.get('/',  EmergencyController.getAllEmergency);
router.get('/:id', EmergencyController.getEmergency);
router.delete('/:id',  EmergencyController.deleteEmergency);
router.patch('/:id',
    auth(AuthUser.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
        return EmergencyController.updateEmergency(req, res, next);
    }
);

export const EmergencyRouter = router;