import AlbumService from "../service/AlbumService.js";
import SongService from "../service/SongService.js";
import UserService from "../service/UserService.js";

class UserController {

  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const user = await UserService.getById(id);

      if (!user.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }

      const songs = await SongService.getAllSongsByArtistId(id);
      const albums = await AlbumService.getAllAlbumsByArtistId(id);

      const response = {
        artist: user.rows[0],
        songs: songs.rows,
        albums: albums.rows,
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updatePhoto(req, res) {
    try {
      const id = req.params.id;
      const photo = req.files.photo;
      const user = await UserService.getById(id);

      console.log(id, photo)

      if (!user.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }

      const updateUserPhoto = await UserService.updatePhoto(photo, id)

      res.status(201).json(updateUserPhoto.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // async update(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const { username, email, password, isartist } = req.body;

  //     const user = await db.query(QUERIES.GET_USER_BY_ID, [id]);
  //     if (!user.rows[0]) {
  //       return res.status(404).json({ error: "User not found" });
  //     }

  //     let uploadedPhoto;
  //     if (req.files && req.files.photo) {
  //       uploadedPhoto = await uploadPhoto.saveFile(req.files.photo);
  //     } else {
  //       uploadedPhoto = user.rows[0].photo;
  //     }

  //     const updatedUser = await db.query(QUERIES.UPDATE_USER, [
  //       username,
  //       email,
  //       password,
  //       uploadedPhoto,
  //       isartist,
  //       id,
  //     ]);
  //     res.json(updatedUser.rows[0]);
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const user = await UserService.getById(id);

      if (!user.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }

      await UserService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new UserController();
