import { Router } from 'express';
import userRoutes from './user.route';
import { noteRoutes } from './note.route';
import { postRoutes } from './post.route';
import { authRoutes } from './auth.route';

const router = Router();

router.use('/users', userRoutes);
router.use('/notes',noteRoutes)
router.use('/posts',postRoutes)
router.use('/auth',authRoutes)

export default router;