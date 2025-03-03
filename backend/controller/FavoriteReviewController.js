import FavoriteReviewService from "../service/FavoriteReviewService.js";

class FavoriteReviewController {
  async create(req, res) {
    try {
      const newFavoriteReview = await FavoriteReviewService.create(req.body);
      res.status(201).json(newFavoriteReview.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const favoritesReviews = await FavoriteReviewService.getAll();

      res.status(200).json(favoritesReviews.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const favoriteReview = await FavoriteReviewService.getById(id);

      if (!favoriteReview.rows[0]) {
        return res.status(404).json({ error: "Favorite review not found" });
      }

      res.status(200).json(favoriteReview.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllReviewsByUserId(req, res) {
    try {
      const userId = req.params.userId;
      const favoriteReviews = await FavoriteReviewService.getAllReviewsByUserId(
        userId
      );
      res.status(200).json(favoriteReviews.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getReviewByIdAndUserById(req, res) {
    try {
      const reviewId = req.params.reviewId;
      const userId = req.params.userId;

      const favoriteReview = await FavoriteReviewService.getReviewByIdAndUserById(
        userId,
        reviewId
      );

      res.status(200).json(favoriteReview.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const favoriteReview = await FavoriteReviewService.getById(id);

      if (!favoriteReview.rows[0]) {
        return res.status(404).json({ error: "Favorite review not found" });
      }

      await FavoriteReviewService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FavoriteReviewController();
