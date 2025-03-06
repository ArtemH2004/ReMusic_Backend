export const ALBUM_QUERY = {
  CREATE: `
    INSERT INTO album (name, photo, artist_id, created_at)
    VALUES ($1, $2, $3, DEFAULT)
    RETURNING *`,
  GET_ALL: `
    SELECT a.*, u.username AS artist_name,
    EXISTS (SELECT 1 FROM favorite_album f WHERE f.album_id = a.id AND f.user_id = $1) AS liked
    FROM album a 
    JOIN users u ON a.artist_id = u.id
    ORDER BY a.created_at DESC`,
  GET_BY_ID: `
    SELECT a.*, u.username AS artist_name,
    EXISTS (SELECT 1 FROM favorite_album f WHERE f.album_id = a.id AND f.user_id = $1) AS liked 
    FROM album a
    JOIN users u ON a.artist_id = u.id
    WHERE a.id = $2`,
  GET_ALL_ALBUMS_BY_ARTIST_ID: `
    SELECT a.*, u.username AS artist_name,
    EXISTS (SELECT 1 FROM favorite_album f WHERE f.album_id = a.id AND f.user_id = $1) AS liked
    FROM album a
    JOIN users u ON a.artist_id = u.id
    WHERE a.artist_id = $2
    ORDER BY a.created_at DESC`,
  UPDATE_RATING_BY_ID: `
    UPDATE album
    SET rating = $1
    WHERE id = $2
    RETURNING *`,
  DELETE: `DELETE FROM album WHERE id = $1`,
};
