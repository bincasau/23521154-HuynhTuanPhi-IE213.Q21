import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1/movies",
  headers: {
    "Content-Type": "application/json",
  },
});

class MovieDataService {
  getAll(page = 0) {
    return apiClient.get(`/?page=${page}`);
  }

  get(id) {
    return apiClient.get(`/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return apiClient.get(`/?${by}=${encodeURIComponent(query)}&page=${page}`);
  }

  createReview(data) {
    return apiClient.post("/review", data);
  }

  updateReview(data) {
    return apiClient.put("/review", data);
  }

  deleteReview(id, userId) {
    return apiClient.delete("/review", {
      data: {
        review_id: id,
        user_id: userId,
      },
    });
  }

  getRatings() {
    return apiClient.get("/ratings");
  }
}

const movieDataService = new MovieDataService();

export default movieDataService;
