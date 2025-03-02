import { Router } from 'express';
import albumController from '../controller/AlbumController.js';

const router = new Router()

router.post('/album', albumController.create)
router.get('/album', albumController.getAll)
router.get('/album/:id', albumController.getById)
router.delete('/album/:id', albumController.delete)

export default router;