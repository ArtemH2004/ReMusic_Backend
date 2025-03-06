import { FAVORITE_SONG_QUERY } from "../query/FavoriteSongQuery.js";
import db from "../db.js";

class FavoriteSongService {
  async create(user_id, song_id) {
    if (!user_id || !song_id) {
      throw new Error("User ID and Song ID are required");
    }

    try {
      const result = await db.query(FAVORITE_SONG_QUERY.CREATE, [
        user_id,
        song_id,
      ]);
      return result;
    } catch (error) {
      throw new Error(`Error creating favorite song: ${error.message}`);
    }
  }

  async getById(user_id, song_id) {
    if (!user_id || !song_id) {
      throw new Error("User ID and Song ID are required");
    }

    try {
      const result = await db.query(FAVORITE_SONG_QUERY.GET_BY_ID, [
        user_id,
        song_id,
      ]);
      return result;
    } catch (error) {
      throw new Error(`Error getting favorite song by ID: ${error.message}`);
    }
  }

  async getAllSongsByUserId(user_id) {
    if (!user_id) {
      throw new Error("User ID is required");
    }

    try {
      const result = await db.query(
        FAVORITE_SONG_QUERY.GET_ALL_SONGS_BY_USER_ID,
        [user_id]
      );
      return result;
    } catch (error) {
      throw new Error(
        `Error getting favorite songs by User ID: ${error.message}`
      );
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Favorite Song ID is required");
    }

    try {
      const result = await db.query(FAVORITE_SONG_QUERY.DELETE, [id]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting favorite song by ID: ${error.message}`);
    }
  }
}

export default new FavoriteSongService();
