import { Router } from 'express';
import userRoutes from './user.route';
import { noteRoutes } from './note.route';
import { postRoutes } from './post.route';

const router = Router();

router.use('/users', userRoutes);
router.use('/notes',noteRoutes)
router.use('/posts',postRoutes)

export default router;