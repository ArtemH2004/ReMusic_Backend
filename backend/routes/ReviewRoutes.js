import { Router } from 'express';
import reviewController from '../controller/ReviewController.js';

const router = new Router()

router.post('/review', reviewController.create)
router.get('/review', reviewController.getAll)
router.get('/review/album/:id', reviewController.getAllAlbum)
router.get('/review/user/:id', reviewController.getAllArtist)
router.get('/review/song/:id', reviewController.getAllSong)
router.get('/review/:id', reviewController.getById)
router.put('/review/:id', reviewController.update)
router.delete('/review/:id', reviewController.delete)

export default router;