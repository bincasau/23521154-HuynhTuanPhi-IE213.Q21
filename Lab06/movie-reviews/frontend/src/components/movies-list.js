import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieDataService from "../services/movies";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("All Ratings");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initialLoad = useRef(true);
  const searchTitleRef = useRef(searchTitle);
  const searchRatingRef = useRef(searchRating);

  useEffect(() => {
    setLoading(true);
    setError("");

    Promise.all([MovieDataService.getAll(0), MovieDataService.getRatings()])
      .then(([moviesResponse, ratingsResponse]) => {
        setMovies(moviesResponse.data.movies || []);
        setCurrentPage(moviesResponse.data.page ?? 0);
        setEntriesPerPage(moviesResponse.data.entries_per_page || 0);
        setTotalResults(moviesResponse.data.total_results || 0);
        setRatings(["All Ratings", ...(ratingsResponse.data || [])]);
      })
      .catch((e) => {
        setError(e.message || "Unable to load movies.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    const loadPage = async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          currentSearchMode === "findByTitle"
            ? await MovieDataService.find(searchTitleRef.current, "title", currentPage)
            : currentSearchMode === "findByRating"
              ? await MovieDataService.find(searchRatingRef.current, "rated", currentPage)
              : await MovieDataService.getAll(currentPage);

        setMovies(response.data.movies || []);
        setCurrentPage(response.data.page ?? currentPage);
        setEntriesPerPage(response.data.entries_per_page || 0);
        setTotalResults(response.data.total_results || 0);
      } catch (e) {
        setError(e.message || "Unable to load movies.");
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [currentPage, currentSearchMode]);

  const findByTitle = () => {
    if (!searchTitle.trim()) {
      setCurrentSearchMode("");
      setCurrentPage(0);
      return;
    }

    setCurrentSearchMode("findByTitle");
    setCurrentPage(0);
  };

  const findByRating = () => {
    if (searchRating === "All Ratings") {
      setCurrentSearchMode("");
      setCurrentPage(0);
      return;
    }

    setCurrentSearchMode("findByRating");
    setCurrentPage(0);
  };

  const hasNextPage = entriesPerPage > 0 && (currentPage + 1) * entriesPerPage < totalResults;

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
              onChange={(event) => {
                const value = event.target.value;
                searchTitleRef.current = value;
                setSearchTitle(value);
              }}
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
              onChange={(event) => {
                const value = event.target.value;
                searchRatingRef.current = value;
                setSearchRating(value);
              }}
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

      <Row className="align-items-center mb-3">
        <Col>
          <div className="text-muted">Showing page: {currentPage}</div>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={!hasNextPage}
          >
            Get next {entriesPerPage} results
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
                src={
                  movie.poster
                    ? `${movie.poster}/100px180`
                    : "https://via.placeholder.com/300x180?text=No+Poster"
                }
                alt={movie.title}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text className="movie-rating">Rating: {movie.rated || "N/A"}</Card.Text>
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
