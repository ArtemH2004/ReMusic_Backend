import { Router } from 'express';
import userController from '../controller/UserController.js';

const router = new Router()

// router.post('/user', userController.create)
router.get('/user', userController.getAll)
router.get('/user/:id', userController.getById)
router.put('/user/photo/:id', userController.updatePhoto)
// router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

export default router;