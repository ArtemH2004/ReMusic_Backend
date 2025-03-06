import FavoriteReviewService from "../service/FavoriteReviewService.js";
import AlbumService from "../service/AlbumService.js";
import SongService from "../service/SongService.js";
import UserService from "../service/UserService.js";

class FavoriteReviewController {
  async create(req, res) {
    try {
      const newFavoriteReview = await FavoriteReviewService.create(
        req.session.userId,
        req.body.review_id
      );
      res.status(201).json(newFavoriteReview.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllReviewsByUserId(req, res) {
    try {
      const userId = req.session.userId;
      const favoriteReviews = await FavoriteReviewService.getAllReviewsByUserId(
        userId
      );

      const promises = favoriteReviews.rows.map(async (review) => {
        if (review.song_id) {
          const song = await SongService.getById(userId, review.song_id);
          return { review, song: song.rows[0] };
        } else if (review.album_id) {
          const album = await AlbumService.getById(userId, review.album_id);
          return { review, album: album.rows[0] };
        } else if (review.artist_id) {
          const artist = await UserService.getById(userId, review.artist_id);
          return { review, artist: artist.rows[0] };
        }
      });

      const response = await Promise.all(promises);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const review_id = req.params.id;
      const favoriteReview = await FavoriteReviewService.getById(
        req.session.userId,
        review_id
      );

      if (!favoriteReview.rows[0]) {
        return res.status(404).json({ error: "Favorite review not found" });
      }

      await FavoriteReviewService.delete(favoriteReview.rows[0].id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FavoriteReviewController();
