import FavoriteAlbumService from "../service/FavoriteAlbumService.js";

class FavoriteAlbumController {
  async create(req, res) {
    try {
      const newFavoriteAlbum = await FavoriteAlbumService.create(req.body);
      res.status(201).json(newFavoriteAlbum.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const favoritesAlbums = await FavoriteAlbumService.getAll();

      res.status(200).json(favoritesAlbums.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const favoriteAlbum = await FavoriteAlbumService.getById(id);

      if (!favoriteAlbum.rows[0]) {
        return res.status(404).json({ error: "Favorite album not found" });
      }

      res.status(200).json(favoriteAlbum.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllAlbumsByUserId(req, res) {
    try {
      const userId = req.params.userId;
      const favoriteAlbums = await FavoriteAlbumService.getAllAlbumsByUserId(
        userId
      );
      res.status(200).json(favoriteAlbums.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAlbumByIdAndUserById(req, res) {
    try {
      const albumId = req.params.albumId;
      const userId = req.params.userId;

      const favoriteAlbum = await FavoriteAlbumService.getAlbumByIdAndUserById(
        userId,
        albumId
      );

      res.status(200).json(favoriteAlbum.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const favoriteAlbum = await FavoriteAlbumService.getById(id);

      if (!favoriteAlbum.rows[0]) {
        return res.status(404).json({ error: "Favorite album not found" });
      }

      await FavoriteAlbumService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FavoriteAlbumController();
