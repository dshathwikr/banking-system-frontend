import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to the Banking System</h1>
      <div className="button-container">
        <Link to="/signin" className="button">
          Sign In
        </Link>
        <Link to="/signup" className="button">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Home;
