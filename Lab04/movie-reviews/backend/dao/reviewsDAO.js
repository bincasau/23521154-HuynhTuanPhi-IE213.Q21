import { ObjectId } from "mongodb";
let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }

    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_DB_NS)
        .collection("reviews");
    } catch (error) {
      console.error(`Unable to connect ReviewsDAO: ${error}`);
    }
  }

  static async addReview(review) {
    try {
      const reviewDoc = {
        name: review.userInfo.name,
        user_id: review.userInfo._id,
        date: review.date,
        review: review.review,
        movie_id: new ObjectId(review.movieId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (error) {
      console.error(`Unable to add review: ${error}`);
      return { error };
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId) },
        { $set: { review: review, date: date } },
      );
      return updateResponse;
    } catch (error) {
      console.error(`Unable to update review: ${error}`);
      return { error };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (error) {
      console.error(`Unable to delete review: ${error}`);
      return { error };
    }
  }
}
