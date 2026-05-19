import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import MoviesList from "./components/movies-list.js";
import Movie from "./components/movie.js";
import Login from "./components/login.js";
import AddReview from "./components/add-review.js";

function AppShell() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    const normalizedId = credentials?.id || credentials?._id || "";
    setUser({
      name: credentials?.name || "",
      id: normalizedId,
      _id: normalizedId,
    });
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Movie Reviews
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <button type="button" className="btn btn-link nav-link px-0" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
              {user && (
                <li className="nav-item">
                  <span className="navbar-text user-badge">Signed in as {user.name}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies/:id" element={<Movie user={user} />} />
          <Route path="/movies/:id/review" element={<AddReview user={user} />} />
          <Route path="/login" element={<Login login={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
