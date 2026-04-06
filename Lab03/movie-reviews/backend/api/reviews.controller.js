import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movie_id;
      const review = req.body.review;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();
      const reviewResponse = await ReviewsDAO.addReview({
        movieId,
        review,
        userInfo,
        date,
      });
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const date = new Date();
      console.log(req.body.user_id);
      const response = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        review,
        date,
      );
      var { error } = response;
      if (error) {
        res.status(400).json({ error });
        return;
      }
      if (response.modifiedCount === 0) {
        throw new Error("Unable to update review");
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const response = await ReviewsDAO.deleteReview(reviewId, userId);

      var { error } = response;
      if (error) {
        res.status(400).json({ error });
        return;
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
