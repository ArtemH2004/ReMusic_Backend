import { Router } from 'express';
import favoriteSongController from '../controller/FavoriteSongController.js';

const router = new Router()

router.post('/favorite/song', favoriteSongController.create)
router.get('/favorite/song', favoriteSongController.getAll)
router.get('/favorite/song/:id', favoriteSongController.getById)
router.get('/favorite/song/user/:userId', favoriteSongController.getAllSongsByUserId)
router.get('/favorite/song/:songId/user/:userId', favoriteSongController.getSongByIdAndUserById)
router.delete('/favorite/song/:id', favoriteSongController.delete)

export default router;