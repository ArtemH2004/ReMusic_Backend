import { Router } from 'express';
import favoriteAlbumController from '../controller/FavoriteAlbumController.js';
import { isAuthMiddleware } from '../middleware/isAuthMiddleware.js';

const router = new Router()

router.post('/favorite/album', isAuthMiddleware, favoriteAlbumController.create)
router.get('/favorite/album', isAuthMiddleware, favoriteAlbumController.getAllAlbumsByUserId)
router.delete('/favorite/album/:id', isAuthMiddleware, favoriteAlbumController.delete)

export default router;