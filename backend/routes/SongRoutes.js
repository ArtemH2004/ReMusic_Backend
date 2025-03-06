import { Router } from 'express';
import songController from '../controller/SongController.js';
import { isAuthMiddleware } from '../middleware/isAuthMiddleware.js';

const router = new Router()

router.post('/song', isAuthMiddleware, songController.create)
router.get('/song', isAuthMiddleware, songController.getAll)
router.get('/song/:id', isAuthMiddleware, songController.getById)
router.delete('/song/:id', isAuthMiddleware, songController.delete)

export default router;