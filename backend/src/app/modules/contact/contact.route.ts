import express from 'express';
import { ContactController } from './contact.controller';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';

const router = express.Router();
router.get('/', auth(AuthUser.ADMIN), ContactController.getAllContactUs);
router.post('/', ContactController.ContactUs);
router.delete('/:id', auth(AuthUser.ADMIN), ContactController.deleteContactUs);

export const ContactRouter = router;