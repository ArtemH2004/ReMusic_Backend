import { Router } from 'express';
import favoriteSongController from '../controller/FavoriteSongController.js';
import { isAuthMiddleware } from '../middleware/isAuthMiddleware.js';

const router = new Router()

router.post('/favorite/song', isAuthMiddleware, favoriteSongController.create)
router.get('/favorite/song', isAuthMiddleware, favoriteSongController.getAllSongsByUserId)
router.delete('/favorite/song/:id', isAuthMiddleware, favoriteSongController.delete)

export default router;