export const SONG_QUERY = {
  CREATE: `
    INSERT INTO song (name, photo, artist_id, songname, album_id, created_at)
    VALUES ($1, $2, $3, $4, $5, DEFAULT)
    RETURNING *`,
  GET_ALL: `
    SELECT s.*, u.username AS artist_name 
    FROM song s
    JOIN users u ON s.artist_id = u.id
    ORDER BY s.created_at DESC`,
  GET_BY_ID: `
    SELECT s.*, u.username AS artist_name 
    FROM song s 
    JOIN users u ON s.artist_id = u.id
    WHERE s.id = $1
    ORDER BY s.created_at DESC`,
  DELETE: `DELETE FROM song WHERE id = $1`,
};
