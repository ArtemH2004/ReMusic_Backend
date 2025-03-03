import { Router } from 'express';
import favoriteReviewController from '../controller/FavoriteReviewController.js';

const router = new Router()

router.post('/favorite/review', favoriteReviewController.create)
router.get('/favorite/review', favoriteReviewController.getAll)
router.get('/favorite/review/:id', favoriteReviewController.getById)
router.get('/favorite/review/user/:userId', favoriteReviewController.getAllReviewsByUserId)
router.get('/favorite/review/:reviewId/user/:userId', favoriteReviewController.getReviewByIdAndUserById)
router.delete('/favorite/review/:id', favoriteReviewController.delete)

export default router;