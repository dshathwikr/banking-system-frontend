import { Link } from "react-router-dom";

function Navbar() {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 20px",
      backgroundColor: "#000",
      color: "#fff",
      borderRadius: 0,
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "16px",
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>
        Home
      </Link>
      <Link to="/signup" style={styles.link}>
        Signup
      </Link>
      <Link to="/signin" style={styles.link}>
        Signin
      </Link>
      <Link to="/dashboard" style={styles.link}>
        Dashboard
      </Link>
    </nav>
  );
}

export default Navbar;
