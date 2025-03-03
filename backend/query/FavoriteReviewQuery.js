export const FAVORITE_REVIEW_QUERY = {
  CREATE: `
    INSERT INTO favorite_review (user_id, review_id, created_at) 
    VALUES ($1, $2, DEFAULT)
    RETURNING *
    `,
  GET_ALL: `SELECT * FROM favorite_review ORDER BY created_at DESC`,
  GET_BY_ID: `
    SELECT * FROM favorite_review WHERE id = $1`,
  GET_ALL_REVIEWS_BY_USER_ID: `
    SELECT r.* FROM favorite_review fs
    JOIN review r ON fs.review_id = r.id
    WHERE fs.user_id = $1
    ORDER BY fs.created_at DESC`,
  GET_REVIEW_BY_ID_AND_USER_ID: `
    SELECT id FROM favorite_review
    WHERE user_id = $1 AND review_id = $2`,
  DELETE: `DELETE FROM favorite_review WHERE id = $1`,
};
