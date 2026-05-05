import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MovieDataService from "../services/movies";

function Movie(props) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    rated: "",
    plot: "",
    poster: "",
    reviews: [],
  });
  const [error, setError] = useState("");

  const getMovie = (movieId) => {
    MovieDataService.get(movieId)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((e) => {
        setError(e.message || "Unable to load movie.");
      });
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const deleteReview = (reviewId) => {
    MovieDataService.deleteReview(reviewId, props.user?._id)
      .then(() => {
        getMovie(id);
      })
      .catch((e) => {
        setError(e.message || "Unable to delete review.");
      });
  };

  const currentReview = location.state?.currentReview;

  return (
    <Container className="movie-detail-page">
      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="g-4">
        <Col md={4}>
          <Image src={movie.poster + "/100px250`"} fluid rounde />
        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Header as="h5">{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>{movie.plot}</Card.Text>
              {props.user && (
                <Link
                  to={`/movies/${id}/review`}
                  state={{ currentReview }}
                  className="btn btn-primary"
                >
                  Add Review
                </Link>
              )}
              {!props.user && (
                <Link to="/login" className="btn btn-primary">
                  Login to review
                </Link>
              )}
            </Card.Body>
          </Card>

          <h2 className="mb-3">Reviews</h2>

          {movie.reviews && movie.reviews.length > 0 ? (
            movie.reviews.map((review, index) => (
              <Card className="mb-3" key={review._id || index}>
                <Card.Body>
                  <Card.Title className="h6">
                    {review.name} reviewed on{" "}
                    {moment(review.date).format("Do MMMM YYYY")}
                  </Card.Title>
                  <Card.Text>{review.review}</Card.Text>
                  {props.user && props.user._id === review.user_id && (
                    <Row className="g-2">
                      <Col xs="auto">
                        <Button
                          variant="link"
                          onClick={() =>
                            navigate(`/movies/${id}/review`, {
                              state: { currentReview: review },
                            })
                          }
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="link"
                          onClick={() => deleteReview(review._id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-muted">No reviews yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Movie;
