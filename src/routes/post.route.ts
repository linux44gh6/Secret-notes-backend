import { Router } from 'express';
import { postController } from '../controllers/post.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, postController.createPost);

router.get('/user/:userId', postController.getPostsByUser);

export const postRoutes=router;