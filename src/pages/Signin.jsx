import { useState } from "react";
import { login } from "../services/api";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await login(formData);
    if (response.error) {
      setMsg(`${response.error}`);
    } else if (response.token) {
      localStorage.setItem("token", response.token);
      setMsg("Welcome back! Token saved.");
    } else {
      setMsg("Login successful, but no token received.");
    }
  }

  const styles = {
    container: {
      maxWidth: 400,
      margin: "50px auto",
      padding: 30, // Increased padding
      border: "1px solid #000",
      borderRadius: 0,
      backgroundColor: "#fff",
      color: "#000",
    },
    formTitle: {
      textAlign: "center",
      marginBottom: 30, // Increased spacing
      color: "#000",
    },
    input: {
      width: "100%",
      padding: 10, // Increased padding
      marginBottom: 20, // Increased spacing
      borderRadius: 0,
      border: "1px solid #000",
      fontSize: 16,
      backgroundColor: "#fff",
      color: "#000",
    },
    button: {
      width: "100%",
      padding: 15, // Increased padding
      backgroundColor: "#000",
      border: "1px solid #000",
      borderRadius: 0,
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      cursor: "pointer",
      marginTop: 10, // Added spacing above the button
    },
    message: {
      marginTop: 20, // Increased spacing
      textAlign: "center",
      fontWeight: "500",
      color: "#000",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 style={styles.formTitle}>Sign In</h2>

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button style={styles.button} type="submit">
          Log In
        </button>
      </form>

      {msg && <p style={styles.message}>{msg}</p>}
    </div>
  );
}

export default Signin;
