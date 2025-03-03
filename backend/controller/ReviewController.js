import AlbumService from "../service/AlbumService.js";
import ReviewService from "../service/ReviewService.js";
import SongService from "../service/SongService.js";

class ReviewController {
  async create(req, res) {
    try {
      const newReview = await ReviewService.create(req.body);

      if (!!newReview.rows[0].song_id) {
        const reviews = await ReviewService.getAllReviewsBySongId(
          newReview.rows[0].song_id
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
          newReview.rows[0].album_id
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
          newReview.rows[0].artist_id
        );

        let totalRating = 0;
        for (let i = 0; i < reviews.rows.length; i++) {
          totalRating = totalRating + reviews.rows[i].rating;
        }

        const newRating = Math.round(totalRating / reviews.rows.length);
        //TODO uncomment
        // await ArtistService.updateRatingById(newRating, newReview.rows[0].artist_id);
      }

      res.status(201).json(newReview);
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
      const reviews = await ReviewService.getAll();

      const promises = reviews.rows.map(async (review) => {
        if (review.song_id) {
          const song = await SongService.getById(review.song_id);
          return { review, song: song.rows[0] };
        } else if (review.album_id) {
          const album = await AlbumService.getById(review.album_id);
          return { review, album: album.rows[0] };
        }
        // Здесь можно добавить обработку для artist_id
      });

      const response = await Promise.all(promises);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const review = await ReviewService.getById(id);

      if (!review.rows[0]) {
        return res.status(404).json({ error: "Review not found" });
      }

      const response = {
        review: review.rows[0],
      };

      if (review.rows[0].song_id) {
        const song = await SongService.getById(review.rows[0].song_id);
        response.song = song.rows[0];
      } else if (review.rows[0].album_id) {
        const album = await AlbumService.getById(review.rows[0].album_id);
        response.album = album.rows[0];
      } else if (review.rows[0].artist_id) {
        // const artist = await ArtistService.getById(review.rows[0].artist_id);
        // response.artist = artist.rows[0]; // Предполагается, что у вас есть ArtistService
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllByArtistId(req, res) {
    try {
      const artist_id = req.params.id;
      const reviews = await ReviewService.getAllReviewsByArtistId(artist_id);

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
      const album_id = req.params.id;
      const reviews = await ReviewService.getAllReviewsByAlbumId(album_id);

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
      const song_id = req.params.id;
      const reviews = await ReviewService.getAllReviewsBySongId(song_id);

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
      const id = req.params.id;
      const review = await ReviewService.getById(id);

      if (!review.rows[0]) {
        return res.status(404).json({ error: "Review not found" });
      }

      await ReviewService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new ReviewController();
