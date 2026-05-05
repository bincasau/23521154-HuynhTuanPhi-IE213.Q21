import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter a name.");
      return;
    }

    const userId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `user-${Date.now()}`;

    setUser({ name: trimmed, _id: userId });
    navigate("/");
  };

  return (
    <div className="auth-card mx-auto">
      <h1 className="h3 mb-3">Login</h1>
      <p className="text-muted mb-4">Enter any name to use the demo account.</p>

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

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
