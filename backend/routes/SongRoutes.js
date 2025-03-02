import { Router } from 'express';
import songController from '../controller/SongController.js';

const router = new Router()

router.post('/song', songController.create)
router.get('/song', songController.getAll)
router.get('/song/:id', songController.getById)
router.delete('/song/:id', songController.delete)

export default router;