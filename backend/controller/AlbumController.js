import db from "../db.js";
import { validationResult } from "express-validator";
import uploadPhoto from "../uploadPhoto.js";

const QUERIES = {
  CREATE_ALBUM: `
    INSERT INTO album (name, photo, artist_id, created_at)
    VALUES ($1, $2, $3, DEFAULT)
    RETURNING *
  `,
  GET_ALL_ALBUMS: `SELECT * FROM album`,
  GET_ALBUM_BY_ID: `SELECT * FROM album WHERE id = $1`,
  DELETE_ALBUM: `DELETE FROM album WHERE id = $1`,
};

class AlbumController {
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, artist_id } = req.body;

      let uploadedPhoto;
      if (req.files && req.files.photo) {
        uploadedPhoto = await uploadPhoto.saveFile(req.files.photo);
      } else {
        uploadedPhoto = null;
      }

      const newAlbum = await db.query(QUERIES.CREATE_ALBUM, [
        name,
        uploadedPhoto,
        artist_id,
      ]);
      res.status(201).json(newAlbum.rows[0]);
    } catch (error) {
      console.error("Error creating album:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const albums = await db.query(QUERIES.GET_ALL_ALBUMS);
      res.json(albums.rows);
    } catch (error) {
      console.error("Error fetching albums:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const album = await db.query(QUERIES.GET_ALBUM_BY_ID, [id]);
      if (!album.rows[0]) {
        return res.status(404).json({ error: "Album not found" });
      }
      res.json(album.rows[0]);
    } catch (error) {
      console.error("Error fetching album:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const album = await db.query(QUERIES.GET_ALBUM_BY_ID, [id]);
      if (!album.rows[0]) {
        return res.status(404).json({ error: "Album not found" });
      }

      await db.query(QUERIES.DELETE_ALBUM, [id]);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting album:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new AlbumController();
