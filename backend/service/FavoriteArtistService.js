import { FAVORITE_ARTIST_QUERY } from "../query/FavoriteArtistQuery.js";
import db from "../db.js";

class FavoriteArtistService {
  async create(ids) {
    const { user_id, artist_id } = ids;

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

  async getAll() {
    try {
      const result = await db.query(FAVORITE_ARTIST_QUERY.GET_ALL);
      return result;
    } catch (error) {
      throw new Error(`Error getting favorites artists: ${error.message}`);
    }
  }

  async getById(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    try {
      const result = await db.query(FAVORITE_ARTIST_QUERY.GET_BY_ID, [id]);
      return result;
    } catch (error) {
      throw new Error(`Error getting favorite artist by ID: ${error.message}`);
    }
  }

  async getAllArtistsByUserId(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const result = await db.query(
        FAVORITE_ARTIST_QUERY.GET_ALL_ARTISTS_BY_USER_ID,
        [userId]
      );
      return result;
    } catch (error) {
      throw new Error(
        `Error getting favorite artists by user ID: ${error.message}`
      );
    }
  }

  async getArtistByIdAndUserById(user_id, artist_id) {
    if (!user_id || !artist_id) {
      throw new Error("User ID and Artist ID are required");
    }

    try {
      const result = await db.query(
        FAVORITE_ARTIST_QUERY.GET_ARTIST_BY_ID_AND_USER_ID,
        [user_id, artist_id]
      );
      return result;
    } catch (error) {
      throw new Error(
        `Error getting favorite Artist by ID and User by ID: ${error.message}`
      );
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Id is required");
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
