export const SONG_QUERY = {
  CREATE: `
    INSERT INTO song (name, photo, artist_id, music, album_id, created_at)
    VALUES ($1, $2, $3, $4, $5, DEFAULT)
    RETURNING *`,
  GET_ALL: `
    SELECT s.*, u.username AS artist_name,
    EXISTS (SELECT 1 FROM favorite_song f WHERE f.song_id = s.id AND f.user_id = $1) AS liked
    FROM song s
    JOIN users u ON s.artist_id = u.id
    ORDER BY s.created_at DESC`,
  GET_BY_ID: `
    SELECT s.*, u.username AS artist_name,
    EXISTS (SELECT 1 FROM favorite_song f WHERE f.song_id = s.id AND f.user_id = $1) AS liked 
    FROM song s 
    JOIN users u ON s.artist_id = u.id
    WHERE s.id = $2`,
  GET_ALL_SONGS_BY_ALBUM_ID: `
    SELECT s.*, u.username AS artist_name,
    EXISTS (SELECT 1 FROM favorite_song f WHERE f.song_id = s.id AND f.user_id = $1) AS liked
    FROM song s
    JOIN users u ON s.artist_id = u.id
    WHERE s.album_id = $2
    ORDER BY s.created_at`,
  GET_ALL_SONGS_BY_ARTIST_ID: `
    SELECT s.*, u.username AS artist_name,
    EXISTS (SELECT 1 FROM favorite_song f WHERE f.song_id = s.id AND f.user_id = $1) AS liked
    FROM song s
    JOIN users u ON s.artist_id = u.id
    WHERE s.artist_id = $2
    ORDER BY s.created_at DESC`,
  UPDATE_RATING_BY_ID: `
    UPDATE song
    SET rating = $1
    WHERE id = $2
    RETURNING *`,
  DELETE: `DELETE FROM song WHERE id = $1`,
};
