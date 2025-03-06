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

  async getAll(userId) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    try {
      const reviews = await db.query(REVIEW_QUERY.GET_ALL, [userId]);
      return reviews;
    } catch (error) {
      throw new Error(`Error getting reviews: ${error.message}`);
    }
  }

  async getById(userId, id) {
    if (!userId || !id) {
      throw new Error("User ID and Review ID are required.");
    }

    try {
      const review = await db.query(REVIEW_QUERY.GET_BY_ID, [userId, id]);
      return review;
    } catch (error) {
      throw new Error(`Error getting review: ${error.message}`);
    }
  }

  async getAllReviewsByArtistId(userId, artistId) {
    if (!userId || !artistId) {
      throw new Error("User ID and Artist ID are required.");
    }

    try {
      const reviews = await db.query(
        REVIEW_QUERY.GET_ALL_REVIEWS_BY_ARTIST_ID,
        [userId, artistId]
      );
      return reviews;
    } catch (error) {
      throw new Error(`Error getting reviews by artist ID: ${error.message}`);
    }
  }

  async getAllReviewsByAlbumId(userId, albumId) {
    if (!userId || !albumId) {
      throw new Error("User ID and Album ID are required.");
    }

    try {
      const reviews = await db.query(REVIEW_QUERY.GET_ALL_REVIEWS_BY_ALBUM_ID, [
        userId,
        albumId,
      ]);
      return reviews;
    } catch (error) {
      throw new Error(`Error getting reviews by album ID: ${error.message}`);
    }
  }

  async getAllReviewsBySongId(userId, songId) {
    if (!userId || !songId) {
      throw new Error("User ID and Song ID are required.");
    }

    try {
      const reviews = await db.query(REVIEW_QUERY.GET_ALL_REVIEWS_BY_SONG_ID, [
        userId,
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
