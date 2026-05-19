import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ login }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedId = id.trim();

    if (!trimmedName || !trimmedId) {
      setError("Please enter both name and ID.");
      return;
    }

    if (typeof login === "function") {
      login({ name: trimmedName, id: trimmedId });
    }
    navigate("/");
  };

  return (
    <div className="auth-card mx-auto">
      <h1 className="h3 mb-3">Login</h1>
      <p className="text-muted mb-4">
        Enter your name and user ID to manage your reviews.
      </p>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="loginName" className="form-label">
            Name
          </label>
          <input
            id="loginName"
            className="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="loginId" className="form-label">
            ID
          </label>
          <input
            id="loginId"
            className="form-control"
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="Your user ID"
          />
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
