import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MovieDataService from "../services/movies";

function AddReview({ user }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentReview = location.state?.currentReview || null;

  const [review, setReview] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        if (currentReview) {
          setReview(currentReview.review || "");
        }
      })
      .catch((e) => {
        setError(e.message || "Unable to load movie.");
      });
  }, [id, currentReview, navigate, user]);

  const onChangeReview = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    const payload = currentReview
      ? {
          review_id: currentReview._id,
          review,
          user_id: user._id,
        }
      : {
          movie_id: id,
          review,
          name: user.name,
          user_id: user._id,
        };

    const request = currentReview
      ? MovieDataService.updateReview(payload)
      : MovieDataService.createReview(payload);

    request
      .then(() => {
        navigate(`/movies/${id}`);
      })
      .catch((e) => {
        setError(e.message || "Unable to save review.");
      });
  };

  if (!user) {
    return (
      <Card className="mx-auto auth-card">
        <Card.Body>
          <Card.Title>Login required</Card.Title>
          <Card.Text>Please login before adding or editing a review.</Card.Text>
          <Link className="btn btn-primary" to="/login">
            Go to login
          </Link>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="review-form-card mx-auto">
      <Card.Body>
        <Card.Title className="mb-3">
          {currentReview ? "Edit Review" : "Add Review"}
        </Card.Title>
        {movie && <Card.Subtitle className="mb-3 text-muted">{movie.title}</Card.Subtitle>}

        {error && <div className="alert alert-danger">{error}</div>}

        <Form>
          <Form.Group className="mb-3" controlId="reviewText">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={review}
              onChange={onChangeReview}
              placeholder="Write your review here"
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="button" onClick={saveReview}>
              Save
            </Button>
            <Link className="btn btn-outline-secondary" to={`/movies/${id}`}>
              Cancel
            </Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddReview;
