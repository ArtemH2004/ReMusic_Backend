import { FAVORITE_ARTIST_QUERY } from "../query/FavoriteArtistQuery.js";
import db from "../db.js";

class FavoriteArtistService {
  async create(user_id, artist_id) {
    if (!user_id || !artist_id) {
      throw new Error("User ID and Artist ID are required");
    }

    try {
      const result = await db.query(FAVORITE_ARTIST_QUERY.CREATE, [
        user_id,
        artist_id,
      ]);
      return result;
    } catch (error) {
      throw new Error(`Error creating favorite artist: ${error.message}`);
    }
  }

  async getById(user_id, artist_id) {
    if (!user_id || !artist_id) {
      throw new Error("User ID and Artist ID are required");
    }

    try {
      const result = await db.query(FAVORITE_ARTIST_QUERY.GET_BY_ID, [
        user_id,
        artist_id,
      ]);
      return result;
    } catch (error) {
      throw new Error(`Error getting favorite artist by ID: ${error.message}`);
    }
  }

  async getAllArtistsByUserId(user_id) {
    if (!user_id) {
      throw new Error("User ID is required");
    }

    try {
      const result = await db.query(
        FAVORITE_ARTIST_QUERY.GET_ALL_ARTISTS_BY_USER_ID,
        [user_id]
      );
      return result;
    } catch (error) {
      throw new Error(
        `Error getting favorite artists by User ID: ${error.message}`
      );
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Favorite Artist ID is required");
    }

    try {
      const result = await db.query(FAVORITE_ARTIST_QUERY.DELETE, [id]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting favorite artist by ID: ${error.message}`);
    }
  }
}

export default new FavoriteArtistService();
