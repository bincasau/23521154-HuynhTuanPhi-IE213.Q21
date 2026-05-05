import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieDataService from "../services/movies";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("All Ratings");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    setLoading(true);
    setError("");

    MovieDataService.getAll()
      .then((response) => {
        setMovies(response.data.movies || []);
      })
      .catch((e) => {
        setError(e.message || "Unable to load movies.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        setRatings(["All Ratings", ...(response.data || [])]);
      })
      .catch((e) => {
        setError(e.message || "Unable to load ratings.");
      });
  };

  const find = (query, by) => {
    setLoading(true);
    setError("");

    MovieDataService.find(query, by)
      .then((response) => {
        setMovies(response.data.movies || []);
      })
      .catch((e) => {
        setError(e.message || "Search failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const findByTitle = () => {
    if (!searchTitle.trim()) {
      retrieveMovies();
      return;
    }

    find(searchTitle, "title");
  };

  const findByRating = () => {
    if (searchRating === "All Ratings") {
      retrieveMovies();
      return;
    }

    find(searchRating, "rated");
  };

  return (
    <Container fluid className="px-0">
      <Row className="g-3 mb-4">
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Search by title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchTitle}
              onChange={(event) => setSearchTitle(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={findByTitle}>
            Search
          </Button>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Search by rating</Form.Label>
            <Form.Select
              value={searchRating}
              onChange={(event) => setSearchRating(event.target.value)}
            >
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="button" onClick={findByRating}>
            Search
          </Button>
        </Col>
      </Row>

      {loading && <div className="alert alert-info">Loading movies...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="g-4">
        {movies.map((movie) => (
          <Col key={movie._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="movie-card h-100">
              <Card.Img
                variant="top"
                src={movie.poster ? `${movie.poster}/100px180` : "https://via.placeholder.com/300x180?text=No+Poster"}
                alt={movie.title}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text className="movie-rating">
                  Rating: {movie.rated || "N/A"}
                </Card.Text>
                <Card.Text className="movie-plot">{movie.plot}</Card.Text>
                <Link className="mt-auto" to={`/movies/${movie._id}`}>
                  View Reviews
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MoviesList;
