import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import "./Signin.css";

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await login(formData);

    if (response.error) {
      setMsg(response.error);
    } else if (response.token) {
      localStorage.setItem("token", response.token);
      setMsg("Welcome back! Redirecting...");
      navigate("/dashboard");
    } else {
      setMsg("Login successful, but no token received.");
    }
  }

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Sign In</h2>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="button" type="submit">
          Log In
        </button>
      </form>
      {msg && <p className="message">{msg}</p>}
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Signin;
