export const FAVORITE_ARTIST_QUERY = {
    CREATE: `
      INSERT INTO favorite_artist (user_id, artist_id, created_at) 
      VALUES ($1, $2, DEFAULT)
      RETURNING *
      `,
    GET_BY_ID: `
      SELECT id 
      FROM favorite_artist 
      WHERE user_id = $1 AND artist_id = $2`,
    GET_ALL_ARTISTS_BY_USER_ID: `
      SELECT u.id, u.username, u.photo, u.rating, u.isartist,
      EXISTS (SELECT 1 FROM favorite_artist f WHERE f.artist_id = u.id AND f.user_id = $1) AS liked
      FROM favorite_artist fa
      JOIN users u ON fa.artist_id = u.id
      WHERE fa.user_id = $1
      ORDER BY fa.created_at DESC`,
    DELETE: `DELETE FROM favorite_artist WHERE id = $1`,
  };
  