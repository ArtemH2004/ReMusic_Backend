import { Router } from 'express';
import favoriteAlbumController from '../controller/FavoriteAlbumController.js';

const router = new Router()

router.post('/favorite/album', favoriteAlbumController.create)
router.get('/favorite/album', favoriteAlbumController.getAll)
router.get('/favorite/album/:id', favoriteAlbumController.getById)
router.get('/favorite/album/user/:userId', favoriteAlbumController.getAllAlbumsByUserId)
router.get('/favorite/album/:albumId/user/:userId', favoriteAlbumController.getAlbumByIdAndUserById)
router.delete('/favorite/album/:id', favoriteAlbumController.delete)

export default router;