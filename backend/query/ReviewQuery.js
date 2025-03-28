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
    SELECT r.*, u.username AS user_name, u.photo AS user_photo,
    EXISTS (SELECT 1 FROM favorite_review f WHERE f.review_id = r.id AND f.user_id = $1) AS liked
    FROM review r 
    JOIN users u ON r.user_id = u.id
    ORDER BY r.created_at DESC`,
  GET_ALL_BY_USER_ID: `
    SELECT r.*, u.username AS user_name, u.photo AS user_photo,
    EXISTS (SELECT 1 FROM favorite_review f WHERE f.review_id = r.id AND f.user_id = $1) AS liked
    FROM review r 
    JOIN users u ON r.user_id = u.id
    WHERE r.user_id = $2
    ORDER BY r.created_at DESC`,
  GET_BY_ID: `
    SELECT r.*, u.username AS user_name , u.photo AS user_photo,
    EXISTS (SELECT 1 FROM favorite_review f WHERE f.review_id = r.id AND f.user_id = $1) AS liked
    FROM review r
    JOIN users u ON r.user_id = u.id
    WHERE r.id = $2`,
  GET_REVIEWS_COUNT_BY_SONG_ID: `
    SELECT s.rating, COUNT(r.id) AS length
    FROM review r 
    JOIN song s ON r.song_id = s.id
    WHERE r.song_id = $1
    GROUP BY s.rating`,
  GET_ALL_REVIEWS_BY_ARTIST_ID: `
    SELECT r.*, u.username AS user_name, u.photo AS user_photo,
    EXISTS (SELECT 1 FROM favorite_review f WHERE f.review_id = r.id AND f.user_id = $1) AS liked
    FROM review r 
    JOIN users u ON r.user_id = u.id
    WHERE r.artist_id = $2
    ORDER BY r.created_at DESC`,
  GET_ALL_REVIEWS_BY_ALBUM_ID: `
    SELECT r.*, u.username AS user_name, u.photo AS user_photo,
    EXISTS (SELECT 1 FROM favorite_review f WHERE f.review_id = r.id AND f.user_id = $1) AS liked
    FROM review r 
    JOIN users u ON r.user_id = u.id
    WHERE r.album_id = $2
    ORDER BY r.created_at DESC`,
  GET_ALL_REVIEWS_BY_SONG_ID: `
    SELECT r.*, u.username AS user_name, u.photo AS user_photo,
    EXISTS (SELECT 1 FROM favorite_review f WHERE f.review_id = r.id AND f.user_id = $1) AS liked
    FROM review r 
    JOIN users u ON r.user_id = u.id
    WHERE r.song_id = $2
    ORDER BY r.created_at DESC`,
  DELETE: `DELETE FROM review WHERE id = $1`,
};
