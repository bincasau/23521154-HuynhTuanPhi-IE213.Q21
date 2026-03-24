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
}
