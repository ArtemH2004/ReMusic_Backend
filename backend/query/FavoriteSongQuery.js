export const FAVORITE_SONG_QUERY = {
  CREATE: `
    INSERT INTO favorite_song (user_id, song_id, created_at) 
    VALUES ($1, $2, DEFAULT)
    RETURNING *
    `,
  GET_BY_ID: `
    SELECT id 
    FROM favorite_song 
    WHERE user_id = $1 AND song_id = $2`,
  GET_ALL_SONGS_BY_USER_ID: `
    SELECT s.*, u.username AS artist_name,
    EXISTS (SELECT 1 FROM favorite_song f WHERE f.song_id = s.id AND f.user_id = $1) AS liked
    FROM favorite_song fs
    JOIN song s ON fs.song_id = s.id
    JOIN users u ON s.artist_id = u.id
    WHERE fs.user_id = $1
    ORDER BY fs.created_at DESC`,
  DELETE: `DELETE FROM favorite_song WHERE id = $1`,
};