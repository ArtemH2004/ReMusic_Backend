export const FAVORITE_ALBUM_QUERY = {
  CREATE: `
    INSERT INTO favorite_album (user_id, album_id, created_at) 
    VALUES ($1, $2, DEFAULT)
    RETURNING *
    `,
  GET_BY_ID: `
    SELECT id 
    FROM favorite_album 
    WHERE user_id = $1 AND album_id = $2`,
  GET_ALL_ALBUMS_BY_USER_ID: `
    SELECT a.*, u.username AS artist_name,
    EXISTS (SELECT 1 FROM favorite_album f WHERE f.album_id = a.id AND f.user_id = $1) AS liked
    FROM favorite_album fa
    JOIN album a ON fa.album_id = a.id
    JOIN users u ON a.artist_id = u.id
    WHERE fa.user_id = $1
    ORDER BY fa.created_at DESC`,
  DELETE: `DELETE FROM favorite_album WHERE id = $1`,
};
