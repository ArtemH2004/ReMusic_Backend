export const FAVORITE_ARTIST_QUERY = {
    CREATE: `
      INSERT INTO favorite_artist (user_id, artist_id, created_at) 
      VALUES ($1, $2, DEFAULT)
      RETURNING *
      `,
    GET_ALL: `SELECT * FROM favorite_artist ORDER BY created_at DESC`,
    GET_BY_ID: `
      SELECT * FROM favorite_artist WHERE id = $1`,
    GET_ALL_ARTISTS_BY_USER_ID: `
      SELECT u.* FROM favorite_artist fs
      JOIN users u ON fs.artist_id = u.id
      WHERE fs.user_id = $1
      ORDER BY fs.created_at DESC`,
    GET_ARTIST_BY_ID_AND_USER_ID: `
      SELECT id FROM favorite_artist
      WHERE user_id = $1 AND artist_id = $2`,
    DELETE: `DELETE FROM favorite_artist WHERE id = $1`,
  };
  