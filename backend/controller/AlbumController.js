import AlbumService from "../service/AlbumService.js";
import SongService from "../service/SongService.js";

class AlbumController {
  async create(req, res) {
    try {
      const newAlbum = await AlbumService.create(req.body, req.files.photo);
      res.status(201).json(newAlbum.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const albums = await AlbumService.getAll(req.session.userId);

      res.status(200).json(albums.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const userId = req.session.userId;
      const id = req.params.id;
      const album = await AlbumService.getById(userId, id);

      if (!album.rows[0]) {
        return res.status(404).json({ error: "Album not found" });
      }

      const songs = await SongService.getAllSongsByAlbumId(userId, id);

      const response = {
        album: album.rows[0],
        songs: songs.rows,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const album = await AlbumService.getById(id);

      if (!album.rows[0]) {
        return res.status(404).json({ error: "Album not found" });
      }

      await AlbumService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new AlbumController();
