import db from "../db.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import uploadPhoto from "../uploadPhoto.js";

const QUERIES = {
  // CREATE_USER: `
  //   INSERT INTO users (username, email, password, photo, isartist, created_at)
  //   VALUES ($1, $2, $3, $4, $5, DEFAULT)
  //   RETURNING *
  // `,
  GET_ALL_USERS: `SELECT * FROM users`,
  GET_USER_BY_ID: `SELECT * FROM users WHERE id = $1`,
  UPDATE_USER_PHOTO: `UPDATE users 
  SET photo = $1 
  WHERE id = $2 
  RETURNING *`,
  UPDATE_USER: `
    UPDATE users
    SET username = $1, email = $2, password = $3, photo = $4, isartist = $5
    WHERE id = $6
    RETURNING *
  `,
  DELETE_USER: `DELETE FROM users WHERE id = $1`,
};

class UserController {
  // async create(req, res) {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   try {
  //     const { username, email, password, photo, isartist } = req.body;
  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     const newUser = await db.query(QUERIES.CREATE_USER, [
  //       username,
  //       email,
  //       hashedPassword,
  //       photo,
  //       isartist,
  //     ]);
  //     res.status(201).json(newUser.rows[0]);
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }

  async getAll(req, res) {
    try {
      const users = await db.query(QUERIES.GET_ALL_USERS);
      res.json(users.rows);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query(QUERIES.GET_USER_BY_ID, [id]);
      if (!user.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user.rows[0]);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updatePhoto(req, res) {
    try {
      const id = req.params.id;

      const user = await db.query(QUERIES.GET_USER_BY_ID, [id]);
      if (!user.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }

      let uploadedPhoto; 
      if (req.files && req.files.photo) {
          uploadedPhoto = await uploadPhoto.saveFile(req.files.photo);
      } else {
          uploadedPhoto = user.rows[0].photo;
      }

      const updateUserPhoto = await db.query(QUERIES.UPDATE_USER_PHOTO, [
        uploadedPhoto,
        id,
      ]);
      res.json(updateUserPhoto.rows[0]);
    } catch (error) {
      console.error("Error updating user:", error);
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
      const user = await db.query(QUERIES.GET_USER_BY_ID, [id]);
      if (!user.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }

      await db.query(QUERIES.DELETE_USER, [id]);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new UserController();
