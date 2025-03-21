import express, { NextFunction, Request, Response } from 'express';
import { AuthUser } from '../../../enums';
import { auth } from '../../middlewares/auth';
import { AmbulaceController } from './ambulance.controller';

const router = express.Router();

router.post('/',  AmbulaceController.createAmbulance);
router.get('/',  AmbulaceController.getAllAmbulance);
router.get('/:id', AmbulaceController.getAmbulace);
router.delete('/:id',  AmbulaceController.deleteAmbulance);
router.patch('/:id',
    auth(AuthUser.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
        return AmbulaceController.updateAmbulance(req, res, next);
    }
);

export const AmbulanceRouter = router;