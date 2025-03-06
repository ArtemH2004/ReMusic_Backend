import { Router } from 'express';
import albumController from '../controller/AlbumController.js';
import { isAuthMiddleware } from '../middleware/isAuthMiddleware.js';

const router = new Router()

router.post('/album', isAuthMiddleware, albumController.create)
router.get('/album', isAuthMiddleware, albumController.getAll)
router.get('/album/:id', isAuthMiddleware, albumController.getById)
router.delete('/album/:id', isAuthMiddleware, albumController.delete)

export default router;