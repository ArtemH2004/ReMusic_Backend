export const USER_QUERY = {
  GET_ALL: `
    SELECT * FROM users
    ORDER BY created_at DESC`,
  GET_BY_ID: `SELECT * FROM users WHERE id = $1`,
  UPDATE_PHOTO: `
    UPDATE users 
    SET photo = $1 
    WHERE id = $2 
    RETURNING *`,
  UPDATE: `
    UPDATE users
    SET username = $1, email = $2, password = $3, photo = $4, isartist = $5
    WHERE id = $6
    RETURNING *`,
  UPDATE_RATING_BY_ID: `
    UPDATE users
    SET rating = $1
    WHERE id = $2
    RETURNING *`,
  DELETE: `DELETE FROM users WHERE id = $1`,
};
