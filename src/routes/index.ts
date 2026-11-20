import { Router } from 'express';
import userRoutes from './user.route';
import { noteRoutes } from './note.route';

const router = Router();

router.use('/users', userRoutes);
router.use('/notes',noteRoutes)

export default router;