import { Router } from 'express';
import { noteController } from '../controllers/note.controller';
import { auth, requireRole } from '../middleware/auth';

const router = Router();

router.use(auth); 

router.post('/', noteController.createNote);
router.get('/', noteController.getMyNotes);


router.get('/all', requireRole('admin'), noteController.getAllNotes);

router.get('/:id', noteController.getSingleNote);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

export const noteRoutes =  router;