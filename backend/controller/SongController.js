import SongService from "../service/SongService.js";

class SongController {
  //TODO add check that created user is artist
  async create(req, res) {
    try {
      const newSong = await SongService.create(req.body, req.files.photo);
      res.status(201).json(newSong.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const songs = await SongService.getAll();

      res.status(200).json(songs.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const song = await SongService.getById(id);

      if (!song.rows[0]) {
        return res.status(404).json({ error: "Song not found" });
      }

      res.status(200).json(song.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const song = await SongService.getById(id);

      if (!song.rows[0]) {
        return res.status(404).json({ error: "Song not found" });
      }

      await SongService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new SongController();
