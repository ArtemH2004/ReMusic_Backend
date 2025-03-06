import { FAVORITE_REVIEW_QUERY } from "../query/FavoriteReviewQuery.js";
import db from "../db.js";

class FavoriteReviewService {
  async create(user_id, review_id) {
    if (!user_id || !review_id) {
      throw new Error("User ID and Review ID are required");
    }

    try {
      const result = await db.query(FAVORITE_REVIEW_QUERY.CREATE, [
        user_id,
        review_id,
      ]);
      return result;
    } catch (error) {
      throw new Error(`Error creating favorite review: ${error.message}`);
    }
  }

  async getById(user_id, review_id) {
    if (!user_id || !review_id) {
      throw new Error("User ID and Review ID are required");
    }

    try {
      const result = await db.query(FAVORITE_REVIEW_QUERY.GET_BY_ID, [user_id, review_id]);
      return result;
    } catch (error) {
      throw new Error(`Error getting favorite review by ID: ${error.message}`);
    }
  }

  async getAllReviewsByUserId(user_id) {
    if (!user_id) {
      throw new Error("User ID is required");
    }

    try {
      const result = await db.query(
        FAVORITE_REVIEW_QUERY.GET_ALL_REVIEWS_BY_USER_ID,
        [user_id]
      );
      return result;
    } catch (error) {
      throw new Error(
        `Error getting favorite reviews by User ID: ${error.message}`
      );
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Favorite Review ID is required");
    }

    try {
      const result = await db.query(FAVORITE_REVIEW_QUERY.DELETE, [id]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting favorite review by ID: ${error.message}`);
    }
  }
}

export default new FavoriteReviewService();
