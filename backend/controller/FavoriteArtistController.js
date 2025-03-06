import FavoriteArtistService from "../service/FavoriteArtistService.js";

class FavoriteArtistController {
  async create(req, res) {
    try {
      const newFavoriteArtist = await FavoriteArtistService.create(req.session.userId, req.body.artist_id);
      res.status(201).json(newFavoriteArtist.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllArtistsByUserId(req, res) {
    try {
      const favoriteArtists = await FavoriteArtistService.getAllArtistsByUserId(
        req.session.userId
      );
      res.status(200).json(favoriteArtists.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const artist_id = req.params.id;
      const favoriteArtist = await FavoriteArtistService.getById(req.session.userId, artist_id);

      if (!favoriteArtist.rows[0]) {
        return res.status(404).json({ error: "Favorite artist not found" });
      }

      await FavoriteArtistService.delete(favoriteArtist.rows[0].id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FavoriteArtistController();
