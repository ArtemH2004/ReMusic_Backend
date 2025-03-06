export const FAVORITE_REVIEW_QUERY = {
  CREATE: `
    INSERT INTO favorite_review (user_id, review_id, created_at) 
    VALUES ($1, $2, DEFAULT)
    RETURNING *
    `,
  GET_BY_ID: `
    SELECT * 
    FROM favorite_review 
    WHERE user_id = $1 AND review_id = $2`,
  GET_ALL_REVIEWS_BY_USER_ID: `
    SELECT r.*, u.username AS user_name, u.photo AS user_photo, 
    EXISTS (SELECT 1 FROM favorite_review f WHERE f.review_id = r.id AND f.user_id = $1) AS liked
    FROM favorite_review fr
    JOIN review r ON fr.review_id = r.id
    JOIN users u ON r.user_id = u.id
    WHERE fr.user_id = $1
    ORDER BY fr.created_at DESC`,
  DELETE: `DELETE FROM favorite_review WHERE id = $1`,
};
