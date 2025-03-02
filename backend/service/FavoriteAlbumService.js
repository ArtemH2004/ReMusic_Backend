import { FAVORITE_ALBUM_QUERY } from "../query/FavoriteAlbumQuery.js";
import db from "../db.js";

class FavoriteAlbumService {
  async create(ids) {
    const { user_id, album_id } = ids;

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

  async getAll() {
    try {
      const result = await db.query(FAVORITE_ALBUM_QUERY.GET_ALL);
      return result;
    } catch (error) {
      throw new Error(`Error getting favorites albums: ${error.message}`);
    }
  }

  async getById(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    try {
      const result = await db.query(FAVORITE_ALBUM_QUERY.GET_BY_ID, [id]);
      return result;
    } catch (error) {
      throw new Error(`Error getting favorite album by ID: ${error.message}`);
    }
  }

  async getAllAlbumsByUserId(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const result = await db.query(
        FAVORITE_ALBUM_QUERY.GET_ALL_ALBUMS_BY_USER_ID,
        [userId]
      );
      return result;
    } catch (error) {
      throw new Error(
        `Error getting favorite albums by user ID: ${error.message}`
      );
    }
  }

  async getAlbumByIdAndUserById(user_id, album_id) {
    if (!user_id || !album_id) {
      throw new Error("User ID and Album ID are required");
    }

    try {
      const result = await db.query(
        FAVORITE_ALBUM_QUERY.GET_ALBUM_BY_ID_AND_USER_ID,
        [user_id, album_id]
      );
      return result;
    } catch (error) {
      throw new Error(
        `Error getting favorite Album by ID and User by ID: ${error.message}`
      );
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Id is required");
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
