import { Router } from 'express';
import authController from '../controller/authController.js';

const router = new Router()

router.post('/register', authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

export default router;