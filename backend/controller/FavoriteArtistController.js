import FavoriteArtistService from "../service/FavoriteArtistService.js";

class FavoriteArtistController {
  async create(req, res) {
    try {
      const newFavoriteArtist = await FavoriteArtistService.create(req.body);
      res.status(201).json(newFavoriteArtist.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const favoritesArtists = await FavoriteArtistService.getAll();

      res.status(200).json(favoritesArtists.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const favoriteArtist = await FavoriteArtistService.getById(id);

      if (!favoriteArtist.rows[0]) {
        return res.status(404).json({ error: "Favorite artist not found" });
      }

      res.status(200).json(favoriteArtist.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllArtistsByUserId(req, res) {
    try {
      const userId = req.params.userId;
      const favoriteArtists = await FavoriteArtistService.getAllArtistsByUserId(
        userId
      );
      res.status(200).json(favoriteArtists.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getArtistByIdAndUserById(req, res) {
    try {
      const artistId = req.params.artistId;
      const userId = req.params.userId;

      const favoriteArtist = await FavoriteArtistService.getArtistByIdAndUserById(
        userId,
        artistId
      );

      res.status(200).json(favoriteArtist.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const favoriteArtist = await FavoriteArtistService.getById(id);

      if (!favoriteArtist.rows[0]) {
        return res.status(404).json({ error: "Favorite artist not found" });
      }

      await FavoriteArtistService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FavoriteArtistController();
