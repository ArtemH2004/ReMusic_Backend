export const SONG_QUERY = {
  CREATE: `
    INSERT INTO song (name, photo, artist_id, songname, album_id, created_at)
    VALUES ($1, $2, $3, $4, $5, DEFAULT)
    RETURNING *
  `,
  GET_ALL: `SELECT * FROM song`,
  GET_BY_ID: `SELECT * FROM song WHERE id = $1`,
  DELETE: `DELETE FROM song WHERE id = $1`,
};