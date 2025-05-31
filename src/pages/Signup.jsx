import { useState } from "react";
import { signup } from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    email: "",
    password: "",
    accountType: "Savings",
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
    const response = await signup(formData);
    if (response.error) {
      setMsg(`${response.error}`);
    } else {
      setMsg(`${response.message}, Account Number: ${response.accountNumber}`);
    }
  }

  const styles = {
    container: {
      maxWidth: 400,
      margin: "50px auto",
      padding: 30,
      border: "1px solid #000",
      borderRadius: 0,
      backgroundColor: "#fff",
      color: "#000",
    },
    formTitle: {
      textAlign: "center",
      marginBottom: 30,
      color: "#000",
    },
    input: {
      width: "100%",
      padding: 10,
      marginBottom: 20,
      borderRadius: 0,
      border: "1px solid #000",
      fontSize: 16,
      backgroundColor: "#fff",
      color: "#000",
    },
    select: {
      width: "100%",
      padding: 10,
      marginBottom: 20,
      borderRadius: 0,
      border: "1px solid #000",
      fontSize: 16,
      backgroundColor: "#fff",
      color: "#000",
    },
    button: {
      width: "100%",
      padding: 15,
      backgroundColor: "#000",
      border: "1px solid #000",
      borderRadius: 0,
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      cursor: "pointer",
      marginTop: 10,
    },
    message: {
      marginTop: 20,
      textAlign: "center",
      fontWeight: "500",
      color: "#000",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 style={styles.formTitle}>Sign Up</h2>

        <input
          style={styles.input}
          type="text"
          name="accountHolderName"
          placeholder="Full Name"
          value={formData.accountHolderName}
          onChange={handleChange}
          required
        />

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

        <select
          style={styles.select}
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          required
        >
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
        </select>

        <button style={styles.button} type="submit">
          Create Account
        </button>
      </form>

      {msg && <p style={styles.message}>{msg}</p>}
    </div>
  );
}

export default Signup;
