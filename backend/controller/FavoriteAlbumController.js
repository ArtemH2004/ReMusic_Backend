import FavoriteAlbumService from "../service/FavoriteAlbumService.js";

class FavoriteAlbumController {
  async create(req, res) {
    try {
      const newFavoriteAlbum = await FavoriteAlbumService.create(req.session.userId, req.body.album_id);
      res.status(201).json(newFavoriteAlbum.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllAlbumsByUserId(req, res) {
    try {
      const user_id = req.session.userId;
      const favoriteAlbums = await FavoriteAlbumService.getAllAlbumsByUserId(
        user_id
      );
      res.status(200).json(favoriteAlbums.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const album_id = req.params.id;
      const favoriteAlbum = await FavoriteAlbumService.getById(req.session.userId, album_id);

      if (!favoriteAlbum.rows[0]) {
        return res.status(404).json({ error: "Favorite album not found" });
      }

      await FavoriteAlbumService.delete(favoriteAlbum.rows[0].id);
      res.status(204).send();
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FavoriteAlbumController();
