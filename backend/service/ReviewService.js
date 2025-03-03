import { REVIEW_QUERY } from "../query/ReviewQuery.js";
import db from "../db.js";

class ReviewService {
  async create(review) {
    const {
      description,
      user_id,
      artist_id,
      album_id,
      song_id,
      rating,
      rhymes,
      rhythm,
      styles,
      individuality,
      atmosphere,
    } = review;

    if (!user_id) {
      throw new Error("User ID field is required.");
    }

    try {
      const createdReview = await db.query(REVIEW_QUERY.CREATE, [
        description,
        user_id,
        artist_id,
        album_id,
        song_id,
        rating,
        rhymes,
        rhythm,
        styles,
        individuality,
        atmosphere,
      ]);

      return createdReview;
    } catch (error) {
      throw new Error(`Error creating review: ${error.message}`);
    }
  }

  async update(review, id) {
    const {
      description,
      rating,
      rhymes,
      rhythm,
      styles,
      individuality,
      atmosphere,
    } = review;

    if (!id) {
      throw new Error("Review ID field is required.");
    }

    try {
      const updatedReview = await db.query(REVIEW_QUERY.UPDATE, [
        description,
        rating,
        rhymes,
        rhythm,
        styles,
        individuality,
        atmosphere,
        id,
      ]);
      return updatedReview;
    } catch (error) {
      throw new Error(`Error updating review: ${error.message}`);
    }
  }

  async getAll() {
    try {
      const reviews = await db.query(REVIEW_QUERY.GET_ALL);
      return reviews;
    } catch (error) {
      throw new Error(`Error getting reviews: ${error.message}`);
    }
  }

  async getById(id) {
    if (!id) {
      throw new Error("Review ID is required.");
    }

    try {
      const review = await db.query(REVIEW_QUERY.GET_BY_ID, [id]);
      return review;
    } catch (error) {
      throw new Error(`Error getting review: ${error.message}`);
    }
  }

  async getAllReviewsByArtistId(artistId) {
    if (!artistId) {
      throw new Error("Artist ID is required.");
    }

    try {
      const reviews = await db.query(
        REVIEW_QUERY.GET_ALL_REVIEWS_BY_ARTIST_ID,
        [artistId]
      );
      return reviews;
    } catch (error) {
      throw new Error(`Error getting reviews by artist ID: ${error.message}`);
    }
  }

  async getAllReviewsByAlbumId(albumId) {
    if (!albumId) {
      throw new Error("Album ID is required.");
    }

    try {
      const reviews = await db.query(REVIEW_QUERY.GET_ALL_REVIEWS_BY_ALBUM_ID, [
        albumId,
      ]);
      return reviews;
    } catch (error) {
      throw new Error(`Error getting reviews by album ID: ${error.message}`);
    }
  }

  async getAllReviewsBySongId(songId) {
    if (!songId) {
      throw new Error("Song ID is required.");
    }

    try {
      const reviews = await db.query(REVIEW_QUERY.GET_ALL_REVIEWS_BY_SONG_ID, [
        songId,
      ]);
      return reviews;
    } catch (error) {
      throw new Error(`Error getting reviews by song ID: ${error.message}`);
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Review ID is required.");
    }

    try {
      const deletedReview = await db.query(REVIEW_QUERY.DELETE, [id]);
      return deletedReview;
    } catch (error) {
      throw new Error(`Error deleting review: ${error.message}`);
    }
  }
}

export default new ReviewService();
