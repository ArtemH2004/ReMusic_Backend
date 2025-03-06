export const USER_QUERY = {
  GET_ALL: `
    SELECT u.id, u.username, u.photo, u.rating, u.isartist,
    EXISTS (SELECT 1 FROM favorite_artist f WHERE f.artist_id = u.id AND f.user_id = $1) AS liked
    FROM users u
    WHERE u.isartist = true
    ORDER BY u.created_at DESC`,
  GET_BY_ID: `
    SELECT u.id, u.username, u.photo, u.rating, u.isartist,
    EXISTS (SELECT 1 FROM favorite_artist f WHERE f.artist_id = u.id AND f.user_id = $1) AS liked
    FROM users u
    WHERE u.id = $2`,
  UPDATE_PHOTO: `
    UPDATE users 
    SET photo = $1 
    WHERE id = $2 
    RETURNING *`,
  UPDATE_RATING_BY_ID: `
    UPDATE users
    SET rating = $1
    WHERE id = $2
    RETURNING *`,
  DELETE: `DELETE FROM users WHERE id = $1`,
};
