import { Router } from 'express';
import reviewController from '../controller/ReviewController.js';
import { isAuthMiddleware } from '../middleware/isAuthMiddleware.js';

const router = new Router()

router.post('/review', isAuthMiddleware, reviewController.create)
router.get('/review', isAuthMiddleware, reviewController.getAll)
router.get('/review/user/:id', isAuthMiddleware, reviewController.getAllByArtistId)
router.get('/review/album/:id', isAuthMiddleware, reviewController.getAllByAlbumId)
router.get('/review/song/:id', isAuthMiddleware, reviewController.getAllBySongId)
router.get('/review/:id', isAuthMiddleware, reviewController.getById)
router.put('/review/:id', isAuthMiddleware, reviewController.update)
router.delete('/review/:id', isAuthMiddleware, reviewController.delete)

export default router;