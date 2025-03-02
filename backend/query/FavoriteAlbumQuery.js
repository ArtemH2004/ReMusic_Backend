export const FAVORITE_ALBUM_QUERY = {
  CREATE: `
    INSERT INTO favorite_album (user_id, album_id, created_at) 
    VALUES ($1, $2, DEFAULT)
    RETURNING *
    `,
  GET_ALL: `SELECT * FROM favorite_album ORDER BY created_at DESC`,
  GET_BY_ID: `
    SELECT * FROM favorite_album WHERE id = $1`,
  GET_ALL_ALBUMS_BY_USER_ID: `
    SELECT a.* FROM favorite_album fs
    JOIN album a ON fs.album_id = a.id
    WHERE fs.user_id = $1
    ORDER BY fs.created_at DESC`,
  GET_ALBUM_BY_ID_AND_USER_ID: `
    SELECT id FROM favorite_album
    WHERE user_id = $1 AND album_id = $2`,
  DELETE: `DELETE FROM favorite_album WHERE id = $1`,
};
