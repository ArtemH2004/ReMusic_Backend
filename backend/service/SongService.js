import { SONG_QUERY } from "../query/SongQuery.js";
import uploadPhoto from "../uploadPhoto.js";
import uploadMusic from "../uploadMusic.js";
import db from "../db.js";

class SongService {
  async create(song, photo, music) {
    const { name, artist_id, album_id } = song;

    if (!name) {
      throw new Error("Song name field is required.");
    }

    let uploadedPhoto;
    if (!!photo) {
      uploadedPhoto = await uploadPhoto.saveFile(photo);
    } else {
      uploadedPhoto = null;
    }

    let uploadedMusic;
    if (!!music) {
      uploadedMusic = await uploadMusic.saveFile(music);
    } else {
      uploadedMusic = null;
    }

    try {
      const createdSong = await db.query(SONG_QUERY.CREATE, [
        name,
        uploadedPhoto,
        artist_id,
        uploadedMusic,
        album_id,
      ]);

      return createdSong;
    } catch (error) {
      throw new Error(`Error creating song: ${error.message}`);
    }
  }

  async getAll(userId) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    try {
      const songs = await db.query(SONG_QUERY.GET_ALL, [userId]);
      return songs;
    } catch (error) {
      throw new Error(`Error getting songs: ${error.message}`);
    }
  }

  async getById(userId, id) {
    if (!userId || !id) {
      throw new Error("User ID and Song ID are required.");
    }

    try {
      const song = await db.query(SONG_QUERY.GET_BY_ID, [userId, id]);
      return song;
    } catch (error) {
      throw new Error(`Error getting song: ${error.message}`);
    }
  }

  async getAllSongsByAlbumId(userId, albumId) {
    if (!userId || !albumId) {
      throw new Error("User ID and Album ID are required.");
    }

    try {
      const songs = await db.query(SONG_QUERY.GET_ALL_SONGS_BY_ALBUM_ID, [
        userId,
        albumId,
      ]);
      return songs;
    } catch (error) {
      throw new Error(`Error getting songs by album ID: ${error.message}`);
    }
  }

  async getAllSongsByArtistId(userId, artistId) {
    if (!userId || !artistId) {
      throw new Error("User ID and Artist ID are required.");
    }

    try {
      const songs = await db.query(SONG_QUERY.GET_ALL_SONGS_BY_ARTIST_ID, [
        userId,
        artistId,
      ]);
      return songs;
    } catch (error) {
      throw new Error(`Error getting songs by Artist ID: ${error.message}`);
    }
  }

  async updateRatingById(rating, id) {
    if (rating < 0 || !id) {
      throw new Error("Rating and Song ID fields are required.");
    }

    try {
      const updatedSong = await db.query(SONG_QUERY.UPDATE_RATING_BY_ID, [
        rating,
        id,
      ]);
      return updatedSong;
    } catch (error) {
      throw new Error(`Error updating song rating: ${error.message}`);
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("Song ID is required.");
    }

    try {
      const deletedSong = await db.query(SONG_QUERY.DELETE, [id]);
      return deletedSong;
    } catch (error) {
      throw new Error(`Error deleting song: ${error.message}`);
    }
  }
}

export default new SongService();
