import FavoriteSongService from "../service/FavoriteSongService.js";

class FavoriteSongController {
  async create(req, res) {
    try {
      const newFavoriteSong = await FavoriteSongService.create(req.session.userId, req.body.song_id);
      res.status(201).json(newFavoriteSong.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllSongsByUserId(req, res) {
    try {
      const favoriteSongs = await FavoriteSongService.getAllSongsByUserId(
        req.session.userId
      );
      res.status(200).json(favoriteSongs.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const song_id = req.params.id;
      const favoriteSong = await FavoriteSongService.getById(req.session.userId, song_id);

      if (!favoriteSong.rows[0]) {
        return res.status(404).json({ error: "Favorite song not found" });
      }

      await FavoriteSongService.delete(favoriteSong.rows[0].id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FavoriteSongController();
