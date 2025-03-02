import FavoriteSongService from "../service/FavoriteSongService.js";

class FavoriteSongController {
  async create(req, res) {
    try {
      const newFavoriteSong = await FavoriteSongService.create(req.body);
      res.status(201).json(newFavoriteSong.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const favoritesSongs = await FavoriteSongService.getAll();

      res.status(200).json(favoritesSongs.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const favoriteSong = await FavoriteSongService.getById(id);

      if (!favoriteSong.rows[0]) {
        return res.status(404).json({ error: "Favorite song not found" });
      }

      res.status(200).json(favoriteSong.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllSongsByUserId(req, res) {
    try {
      const userId = req.params.userId;
      const favoriteSongs = await FavoriteSongService.getAllSongsByUserId(
        userId
      );
      res.status(200).json(favoriteSongs.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getSongByIdAndUserById(req, res) {
    try {
      const songId = req.params.songId;
      const userId = req.params.userId;

      const favoriteSong = await FavoriteSongService.getSongByIdAndUserById(
        userId,
        songId
      );

      res.status(200).json(favoriteSong.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const favoriteSong = await FavoriteSongService.getById(id);

      if (!favoriteSong.rows[0]) {
        return res.status(404).json({ error: "Favorite song not found" });
      }

      await FavoriteSongService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FavoriteSongController();
