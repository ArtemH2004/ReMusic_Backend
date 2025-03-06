import { Router } from 'express';
import favoriteArtistController from '../controller/FavoriteArtistController.js';
import { isAuthMiddleware } from '../middleware/isAuthMiddleware.js';

const router = new Router()

router.post('/favorite/artist', isAuthMiddleware, favoriteArtistController.create)
router.get('/favorite/artist', isAuthMiddleware, favoriteArtistController.getAllArtistsByUserId)
router.delete('/favorite/artist/:id', isAuthMiddleware, favoriteArtistController.delete)

export default router;