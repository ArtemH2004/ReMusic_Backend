export const ALBUM_QUERY = {
  CREATE: `
    INSERT INTO album (name, photo, artist_id, created_at)
    VALUES ($1, $2, $3, DEFAULT)
    RETURNING *`,
  GET_ALL: `
    SELECT a.*, u.username AS artist_name
    FROM album a 
    JOIN users u ON a.artist_id = u.id
    ORDER BY a.created_at DESC`,
  GET_BY_ID: `
    SELECT a.*, u.username AS artist_name 
    FROM album a
    JOIN users u ON a.artist_id = u.id
    WHERE a.id = $1
    ORDER BY a.created_at DESC`,
  DELETE: `DELETE FROM album WHERE id = $1`,
};
