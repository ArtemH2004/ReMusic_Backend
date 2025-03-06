import { Router } from 'express';
import favoriteReviewController from '../controller/FavoriteReviewController.js';
import { isAuthMiddleware } from '../middleware/isAuthMiddleware.js';

const router = new Router()

router.post('/favorite/review', isAuthMiddleware, favoriteReviewController.create)
router.get('/favorite/review', isAuthMiddleware, favoriteReviewController.getAllReviewsByUserId)
router.delete('/favorite/review/:id', isAuthMiddleware, favoriteReviewController.delete)

export default router;