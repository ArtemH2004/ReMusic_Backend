import AlbumService from "../service/AlbumService.js";

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
      const albums = await AlbumService.getAll();

      res.status(200).json(albums.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const album = await AlbumService.getById(id);

      if (!album.rows[0]) {
        return res.status(404).json({ error: "Album not found" });
      }

      res.status(200).json(album.rows[0]);
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