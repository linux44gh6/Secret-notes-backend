import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getMe);

export const authRoutes=router;