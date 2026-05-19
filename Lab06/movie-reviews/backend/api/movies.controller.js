import MoviesDAO from "../dao/movieDAO.js";

export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    let filter = {};
    if (req.query.title) {
      filter.title = req.query.title;
    } else if (req.query.rated) {
      filter.rated = req.query.rated;
    }
    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filter,
      page,
      moviesPerPage,
    });
    let response = {
      movies: moviesList,
      page: page,
      filters: filter,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };
    res.json(response);
  }

  static async apiGetMovieByID(req, res, next) {
    try {
      let id = req.params.id || {};
      let movie = await MoviesDAO.getMovieByID(id);
      if (!movie) {
        res.status(404).json({ error: "Movie not found" });
        return;
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiGetRatings(req, res, next) {
    try {
      let propertyTypes = await MoviesDAO.getRatings();
      res.json(propertyTypes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
