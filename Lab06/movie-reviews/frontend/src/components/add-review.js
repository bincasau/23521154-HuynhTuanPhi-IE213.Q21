import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MovieDataService from "../services/movies";

function AddReview({ user }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentReview = location.state?.currentReview || null;
  const editing = Boolean(currentReview);
  const initialReviewState = editing ? currentReview.review || "" : "";

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    setReview(initialReviewState);
  }, [initialReviewState, navigate, user]);

  const onChangeReview = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    const data = {
      review,
      name: user.name,
      user_id: user._id || user.id,
      movie_id: id,
    };

    const request = editing
      ? MovieDataService.updateReview({
          ...data,
          review_id: currentReview._id,
        })
      : MovieDataService.createReview(data);

    request
      .then(() => {
        setSubmitted(true);
      })
      .catch((e) => {
        setError(e.message || "Unable to save review.");
      });
  };

  if (!user) {
    return null;
  }

  if (submitted) {
    return (
      <div className="auth-card mx-auto">
        <h4>Review submitted successfully</h4>
        <Link to={`/movies/${id}`}>Back to Movie</Link>
      </div>
    );
  }

  return (
    <div className="review-form-card mx-auto">
      <h1 className="h3 mb-3">{editing ? "Edit" : "Create"} Review</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control
            type="text"
            required
            value={review}
            onChange={onChangeReview}
            placeholder="Write your review"
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={saveReview}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddReview;
