export const FAVORITE_SONG_QUERY = {
  CREATE: `
    INSERT INTO favorite_song (user_id, song_id, created_at) 
    VALUES ($1, $2, DEFAULT)
    RETURNING *
    `,
  GET_ALL: `SELECT * FROM favorite_song ORDER BY created_at DESC`,
  GET_BY_ID: `
    SELECT * FROM favorite_song WHERE id = $1`,
  GET_ALL_SONGS_BY_USER_ID: `
    SELECT s.* FROM favorite_song fs
    JOIN song s ON fs.song_id = s.id
    WHERE fs.user_id = $1
    ORDER BY fs.created_at DESC`,
  GET_SONG_BY_ID_AND_USER_ID: `
    SELECT id FROM favorite_song
    WHERE user_id = $1 AND song_id = $2`,
  DELETE: `DELETE FROM favorite_song WHERE id = $1`,
};
