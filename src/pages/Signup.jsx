import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    email: "",
    password: "",
    accountType: "Savings",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await signup(formData);

    if (response.error) {
      setMsg(response.error);
    } else {
      setMsg(`Account Number: ${response.accountNumber}`);
      setTimeout(() => navigate("/signin"), 2000);
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Sign Up</h2>
        <input
          className="input"
          type="text"
          name="accountHolderName"
          placeholder="Full Name"
          value={formData.accountHolderName}
          onChange={handleChange}
          required
        />
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
        <select
          className="select"
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          required
        >
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
        </select>
        <button className="button" type="submit">
          Create Account
        </button>
      </form>
      {msg && <p className="message">{msg}</p>}
      <p className="signin-link">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default Signup;
