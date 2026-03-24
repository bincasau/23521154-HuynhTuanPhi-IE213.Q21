let movies;

export default class MoviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return;
    }

    try {
      movies = await conn
        .db(process.env.MOVIEREVIEWS_DB_NS)
        .collection("movies");
    } catch (error) {
      console.error(`Unable to connect MoviesDAO: ${error}`);
    }
  }

  static async getMovies({ filter = null, page = 0, moviesPerPage = 20 } = {}) {
    let query;

    if (filter) {
      if ("title" in filter) {
        query = { $text: { $search: filter["title"] } };
      } else if ("rated" in filter) {
        query = { rated: { $eq: filter["rated"] } };
      }
    }

    let cursor;
    try {
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);
      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);
      return { moviesList, totalNumMovies };
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }
}
