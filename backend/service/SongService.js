import { SONG_QUERY } from "../query/SongQuery.js";
import uploadPhoto from "../uploadPhoto.js";
import db from "../db.js";

class SongService {
  async create(song, photo) {
    const { name, songname, artist_id, album_id } = song;

    if (!name || !songname) {
      throw new Error("Song name field is required.");
    }

    let uploadedPhoto;
    if (!!photo) {
      uploadedPhoto = await uploadPhoto.saveFile(photo);
    } else {
      uploadedPhoto = null;
    }

    try {
      const createdSong = await db.query(SONG_QUERY.CREATE, [
        name,
        uploadedPhoto,
        artist_id,
        songname,
        album_id
      ]);

      return createdSong;
    } catch (error) {
      throw new Error(`Error creating song: ${error.message}`);
    }
  }

  async getAll() {
    try {
      const songs = await db.query(SONG_QUERY.GET_ALL);
      return songs;
    } catch (error) {
      throw new Error(`Error getting songs: ${error.message}`);
    }
  }

  async getById(id) {
    if (!id) {
      throw new Error("Song ID is required.");
    }

    try {
      const song = await db.query(SONG_QUERY.GET_BY_ID, [id]);
      return song;
    } catch (error) {
      throw new Error(`Error getting song: ${error.message}`);
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
