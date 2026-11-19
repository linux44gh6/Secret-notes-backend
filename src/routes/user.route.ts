import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { auth, requireRole } from '../middleware/auth';

const router = Router();

// এই ফাইলের সব রুট শুধু Admin-এর জন্য
router.use(auth, requireRole('admin'));

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;