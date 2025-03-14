import AlbumService from "../service/AlbumService.js";
import ReviewService from "../service/ReviewService.js";
import SongService from "../service/SongService.js";
import UserService from "../service/UserService.js";

class ReviewController {
  async create(req, res) {
    try {
      const userId = req.session.userId;
      const newReview = await ReviewService.create(req.body);

      if (!!newReview.rows[0].song_id) {
        const reviews = await ReviewService.getAllReviewsBySongId(
          userId, newReview.rows[0].song_id
        );

        let totalRating = 0;
        for (let i = 0; i < reviews.rows.length; i++) {
          totalRating = totalRating + reviews.rows[i].rating;
        }

        const newRating = Math.round(totalRating / reviews.rows.length);
        await SongService.updateRatingById(
          newRating,
          newReview.rows[0].song_id
        );
      } else if (!!newReview.rows[0].album_id) {
        const reviews = await ReviewService.getAllReviewsByAlbumId(
          userId, newReview.rows[0].album_id
        );

        let totalRating = 0;
        for (let i = 0; i < reviews.rows.length; i++) {
          totalRating = totalRating + reviews.rows[i].rating;
        }

        const newRating = Math.round(totalRating / reviews.rows.length);
        await AlbumService.updateRatingById(
          newRating,
          newReview.rows[0].album_id
        );
      } else if (!!newReview.rows[0].artist_id) {
        const reviews = await ReviewService.getAllReviewsByArtistId(
          userId, newReview.rows[0].artist_id
        );

        let totalRating = 0;
        for (let i = 0; i < reviews.rows.length; i++) {
          totalRating = totalRating + reviews.rows[i].rating;
        }

        const newRating = Math.round(totalRating / reviews.rows.length);
        await UserService.updateRatingById(
          newRating,
          newReview.rows[0].artist_id
        );
      }

      res.status(201).json(newReview.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const review = await ReviewService.getById(id);

      if (!review.rows[0]) {
        return res.status(404).json({ error: "Review not found" });
      }

      const updateReview = await ReviewService.update(req.body, id);
      res.status(201).json(updateReview.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const userId = req.session.userId;
      const reviews = await ReviewService.getAll(userId);

      const promises = reviews.rows.map(async (review) => {
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

  async getAllByUserId(req, res) {
    try {
      const userId = req.session.userId;
      const user_id = req.params.id;
      const reviews = await ReviewService.getAllByUserId(userId, user_id);

      const promises = reviews.rows.map(async (review) => {
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

  async getById(req, res) {
    try {
      const userId = req.session.userId;
      const id = req.params.id;
      const review = await ReviewService.getById(userId, id);

      if (!review.rows[0]) {
        return res.status(404).json({ error: "Review not found" });
      }

      const response = {
        review: review.rows[0],
      };

      if (review.rows[0].song_id) {
        const song = await SongService.getById(userId, review.rows[0].song_id);
        response.song = song.rows[0];
      } else if (review.rows[0].album_id) {
        const album = await AlbumService.getById(
          userId,
          review.rows[0].album_id
        );
        response.album = album.rows[0];
      } else if (review.rows[0].artist_id) {
        const artist = await UserService.getById(
          userId,
          review.rows[0].artist_id
        );
        response.artist = artist.rows[0];
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllByArtistId(req, res) {
    try {
      const userId = req.session.userId;
      const artist_id = req.params.id;
      const reviews = await ReviewService.getAllReviewsByArtistId(
        userId,
        artist_id
      );

      if (!reviews.rows[0]) {
        return res
          .status(404)
          .json({ error: "No reviews found for this artist" });
      }

      res.json(reviews.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllByAlbumId(req, res) {
    try {
      const userId = req.session.userId;
      const album_id = req.params.id;
      const reviews = await ReviewService.getAllReviewsByAlbumId(
        userId,
        album_id
      );

      if (!reviews.rows[0]) {
        return res
          .status(404)
          .json({ error: "No reviews found for this album" });
      }

      res.json(reviews.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllBySongId(req, res) {
    try {
      const userId = req.session.userId;
      const song_id = req.params.id;
      const reviews = await ReviewService.getAllReviewsBySongId(
        userId,
        song_id
      );

      if (!reviews.rows[0]) {
        return res
          .status(404)
          .json({ error: "No reviews found for this song" });
      }

      res.json(reviews.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const userId = req.session.userId;
      const id = req.params.id;
      const review = await ReviewService.getById(userId, id);

      if (!review.rows[0]) {
        return res.status(404).json({ error: "Review not found" });
      }

      if (!!review.rows[0].song_id) {
        const songReview = await ReviewService.getReviewSongCountById(
          review.rows[0].song_id
        );

        const rating = songReview.rows[0].rating * songReview.rows[0].length - review.rows[0].rating;
        const length = songReview.rows[0].length - (songReview.rows[0].length !== 1 ? 1 : 0);

        const newRating = Math.round(rating / length);
        console.log(newRating, review.rows[0].song_id);
        await SongService.updateRatingById(
          newRating,
          review.rows[0].song_id
        );
      } else if (!!review.rows[0].album_id) {
        const reviews = await ReviewService.getAllReviewsByAlbumId(
          userId, review.rows[0].album_id
        );

        let totalRating = 0;
        for (let i = 0; i < reviews.rows.length; i++) {
          totalRating = totalRating + reviews.rows[i].rating;
        }

        const newRating = Math.round((totalRating - review.rows[0].rating) / (reviews.rows.length - 1));
        await AlbumService.updateRatingById(
          newRating,
          review.rows[0].album_id
        );
      } else if (!!review.rows[0].artist_id) {
        const reviews = await ReviewService.getAllReviewsByArtistId(
          userId, review.rows[0].artist_id
        );

        let totalRating = 0;
        for (let i = 0; i < reviews.rows.length; i++) {
          totalRating = totalRating + reviews.rows[i].rating;
        }

        const newRating = Math.round((totalRating - review.rows[0].rating) / (reviews.rows.length - 1));
        await UserService.updateRatingById(
          newRating,
          review.rows[0].artist_id
        );
      }

      await ReviewService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new ReviewController();
