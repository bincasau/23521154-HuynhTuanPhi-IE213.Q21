import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MoviesList from "./components/movies-list.js";
import Movie from "./components/movie.js";
import Login from "./components/login.js";
import AddReview from "./components/add-review.js";

function App() {
  const [user, setUser] = useState(null);

  const handleAuth = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({ name: "User" });
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Movie Reviews
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Movies
                  </Link>
                </li>

                <li className="nav-item">
                  {user ? (
                    <Link className="nav-link" to="/" onClick={handleAuth}>
                      Logout
                    </Link>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route
              path="/movies/:id/review"
              element={<AddReview user={user} />}
            />
            <Route path="/movies/:id" element={<Movie user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
