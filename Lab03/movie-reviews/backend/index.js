import dotenv from "dotenv";
import app from "./server.js";
import mongodb from "mongodb";
import MoviesDAO from "./dao/movieDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

async function main() {
  dotenv.config();
  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URL);
  const port = process.env.PORT || 8000;
  try {
    await client.connect();
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.locals.db = client.db(process.env.MOVIEREVIEWS_DB_NS);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);
