import { Router } from 'express';
import userController from '../controller/UserController.js';
import { isAuthMiddleware } from '../middleware/isAuthMiddleware.js';

const router = new Router()

router.get('/user', isAuthMiddleware, userController.getAll)
router.get('/user/:id', isAuthMiddleware, userController.getById)
router.put('/user/photo/:id', isAuthMiddleware, userController.updatePhoto)
router.delete('/user/:id', isAuthMiddleware, userController.delete)

export default router;