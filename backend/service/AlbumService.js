import { ALBUM_QUERY } from "../query/AlbumQuery.js";
import uploadPhoto from "../uploadPhoto.js";
import db from "../db.js";

class AlbumService {
  async create(album, photo) {
    const { name, artist_id } = album;

    if (!name || !artist_id) {
      throw new Error("Album name and Artist ID fields are required.");
    }

    let uploadedPhoto;
    if (!!photo) {
      uploadedPhoto = await uploadPhoto.saveFile(photo);
    } else {
      uploadedPhoto = null;
    }

    try {
      const createdAlbum = await db.query(ALBUM_QUERY.CREATE, [
        name,
        uploadedPhoto,
        artist_id,
      ]);

      return createdAlbum;
    } catch (error) {
      throw new Error(`Error creating album: ${error.message}`);
    }
  }

  async getAll(userId) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    try {
      const albums = await db.query(ALBUM_QUERY.GET_ALL, [userId]);
      return albums;
    } catch (error) {
      throw new Error(`Error getting albums: ${error.message}`);
    }
  }

  async getById(userId, id) {
    if (!userId || !id) {
      throw new Error("User ID and Album ID are required.");
    }

    try {
      const album = await db.query(ALBUM_QUERY.GET_BY_ID, [userId, id]);
      return album;
    } catch (error) {
      throw new Error(`Error getting album: ${error.message}`);
    }
  }

  async getAllAlbumsByArtistId(userId, artistId) {
    if (!userId || !artistId) {
      throw new Error("User ID and Artist ID are required.");
    }

    try {
      const albums = await db.query(ALBUM_QUERY.GET_ALL_ALBUMS_BY_ARTIST_ID, [
        userId,
        artistId,
      ]);
      return albums;
    } catch (error) {
      throw new Error(`Error getting albums by Artist ID: ${error.message}`);
    }
  }

  async updateRatingById(rating, id) {
    if (!rating || !id) {
      throw new Error("Rating and Album ID fields are required.");
    }

    try {
      const updatedAlbum = await db.query(ALBUM_QUERY.UPDATE_RATING_BY_ID, [
        rating,
        id,
      ]);
      return updatedAlbum;
    } catch (error) {
      throw new Error(`Error updating album rating: ${error.message}`);
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Album ID is required.");
    }

    try {
      const deletedAlbum = await db.query(ALBUM_QUERY.DELETE, [id]);
      return deletedAlbum;
    } catch (error) {
      throw new Error(`Error deleting album: ${error.message}`);
    }
  }
}

export default new AlbumService();
