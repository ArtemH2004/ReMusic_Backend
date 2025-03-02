import { Router } from 'express';
import favoriteArtistController from '../controller/FavoriteArtistController.js';

const router = new Router()

router.post('/favorite/artist', favoriteArtistController.create)
router.get('/favorite/artist', favoriteArtistController.getAll)
router.get('/favorite/artist/:id', favoriteArtistController.getById)
router.get('/favorite/artist/user/:userId', favoriteArtistController.getAllArtistsByUserId)
router.get('/favorite/artist/:artistId/user/:userId', favoriteArtistController.getArtistByIdAndUserById)
router.delete('/favorite/artist/:id', favoriteArtistController.delete)

export default router;