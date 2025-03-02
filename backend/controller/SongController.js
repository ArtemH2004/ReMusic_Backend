import db from "../db.js";
import { validationResult } from "express-validator";
import uploadPhoto from "../uploadPhoto.js";

const QUERIES = {
  CREATE_SONG: `
    INSERT INTO song (name, photo, artist_id, songname, album_id, created_at)
    VALUES ($1, $2, $3, $4, $5, DEFAULT)
    RETURNING *
  `,
  GET_ALL_SONGS: `SELECT * FROM song`,
  GET_SONG_BY_ID: `SELECT * FROM song WHERE id = $1`,
  DELETE_SONG: `DELETE FROM song WHERE id = $1`,
};

class SongController {
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, artist_id, songname, album_id } = req.body;

      let uploadedPhoto;
      if (req.files && req.files.photo) {
        uploadedPhoto = await uploadPhoto.saveFile(req.files.photo);
      } else {
        uploadedPhoto = null;
      }

      const newSong = await db.query(QUERIES.CREATE_SONG, [
        name,
        uploadedPhoto,
        artist_id,
        songname,
        album_id
      ]);
      res.status(201).json(newSong.rows[0]);
    } catch (error) {
      console.error("Error creating song:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const songs = await db.query(QUERIES.GET_ALL_SONGS);
      res.json(songs.rows);
    } catch (error) {
      console.error("Error fetching songs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const song = await db.query(QUERIES.GET_SONG_BY_ID, [id]);
      if (!song.rows[0]) {
        return res.status(404).json({ error: "Song not found" });
      }
      res.json(song.rows[0]);
    } catch (error) {
      console.error("Error fetching song:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const song = await db.query(QUERIES.GET_SONG_BY_ID, [id]);
      if (!song.rows[0]) {
        return res.status(404).json({ error: "Song not found" });
      }

      await db.query(QUERIES.DELETE_SONG, [id]);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting song:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new SongController();
