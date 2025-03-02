import db from "../db.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

const QUERIES = {
  SEARCH_USER: `
      SELECT * FROM users WHERE username = $1 OR email = $2
    `,
  CREATE_USER: `
    INSERT INTO users (username, email, password, isartist, created_at)
    VALUES ($1, $2, $3, $4, DEFAULT)
    RETURNING *
  `,
  SEARCH_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
};

class AuthController {
  async registration(req, res) {
    await body("username")
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage("Username must contain only letters, numbers, and spaces.")
      .run(req);
    await body("email").isEmail().withMessage("Invalid email format.").run(req);
    await body("password")
      .isLength({ min: 4, max: 10 })
      .withMessage("Password must be at least 4 characters long.")
      .run(req);  

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password, isartist } = req.body;
      const candidate = await db.query(QUERIES.SEARCH_USER, [username, email]);

      if (candidate.rows.length > 0) {
        return res
          .status(409)
          .json({ error: "Username or Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.query(QUERIES.CREATE_USER, [
        username,
        email,
        hashedPassword,
        isartist
      ]);

      res.status(201).json(newUser.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Registration Error" });
    }
  }

  async login(req, res) {
    await body("email").isEmail().withMessage("Invalid email format.").run(req);
    await body("password")
      .isLength({ min: 4, max: 10 })
      .withMessage("Password must be at least 4 characters long.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await db.query(QUERIES.SEARCH_USER_BY_EMAIL, [email]);

      if (user.rows.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!isPasswordValid) {
        return res.status(402).json({ error: "Incorrect password" });
      }

      req.session.userId = user.rows[0].id;
      req.session.email = user.rows[0].email;

      res.json({ user: user.rows[0], message: "Login successful" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Login Error" });
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout Error" });
      }
      res.json({ message: "Logout successful" });
    });
  }
}

export default new AuthController();
