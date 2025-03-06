import { FAVORITE_ALBUM_QUERY } from "../query/FavoriteAlbumQuery.js";
import db from "../db.js";

class FavoriteAlbumService {
  async create(user_id, album_id) {
    if (!user_id || !album_id) {
      throw new Error("User ID and Album ID are required");
    }

    try {
      const result = await db.query(FAVORITE_ALBUM_QUERY.CREATE, [
        user_id,
        album_id,
      ]);
      return result;
    } catch (error) {
      throw new Error(`Error creating favorite album: ${error.message}`);
    }
  }

  async getById(user_id, album_id) {
    if (!user_id || !album_id) {
      throw new Error("User ID and Album ID are required");
    }

    try {
      const result = await db.query(FAVORITE_ALBUM_QUERY.GET_BY_ID, [
        user_id,
        album_id,
      ]);
      return result;
    } catch (error) {
      throw new Error(`Error getting favorite album by ID: ${error.message}`);
    }
  }

  async getAllAlbumsByUserId(user_id) {
    if (!user_id) {
      throw new Error("User ID is required");
    }

    try {
      const result = await db.query(
        FAVORITE_ALBUM_QUERY.GET_ALL_ALBUMS_BY_USER_ID,
        [user_id]
      );
      return result;
    } catch (error) {
      throw new Error(
        `Error getting favorite albums by User ID: ${error.message}`
      );
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Favorite Album ID is required");
    }

    try {
      const result = await db.query(FAVORITE_ALBUM_QUERY.DELETE, [id]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting favorite album by ID: ${error.message}`);
    }
  }
}

export default new FavoriteAlbumService();
