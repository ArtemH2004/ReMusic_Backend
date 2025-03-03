export const REVIEW_QUERY = {
  CREATE: `
    INSERT INTO review (description, user_id, artist_id, album_id, song_id, rating, rhymes, rhythm, styles, individuality, atmosphere, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, DEFAULT)
    RETURNING *`,
  UPDATE: `
    UPDATE review
    SET description = $1, rating = $2, rhymes = $3, rhythm = $4, styles = $5, individuality = $6, atmosphere = $7
    WHERE id = $8
    RETURNING *
  `,
  GET_ALL: `
    SELECT r.*, u.username AS user_name, u.photo AS user_photo
    FROM review r 
    JOIN users u ON r.user_id = u.id
    ORDER BY r.created_at DESC`,
  GET_BY_ID: `
    SELECT r.*, u.username AS user_name , u.photo AS user_photo
    FROM review r
    JOIN users u ON r.user_id = u.id
    WHERE r.id = $1`,
  GET_ALL_REVIEWS_BY_ARTIST_ID: `
    SELECT r.*, u.username AS user_name , u.photo AS user_photo
    FROM review r 
    JOIN users u ON r.user_id = u.id
    WHERE r.artist_id = $1
    ORDER BY r.created_at DESC`,
  GET_ALL_REVIEWS_BY_ALBUM_ID: `
    SELECT r.*, u.username AS user_name , u.photo AS user_photo
    FROM review r 
    JOIN users u ON r.user_id = u.id
    WHERE r.album_id = $1
    ORDER BY r.created_at DESC`,
  GET_ALL_REVIEWS_BY_SONG_ID: `
    SELECT r.*, u.username AS user_name , u.photo AS user_photo
    FROM review r 
    JOIN users u ON r.user_id = u.id
    WHERE r.song_id = $1
    ORDER BY r.created_at DESC`,
  DELETE: `DELETE FROM review WHERE id = $1`,
};
