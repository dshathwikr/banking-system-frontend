import { Link } from "react-router-dom";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  useEffect(()=>{
    if (token) navigate("/dashboard")
  }, [token, navigate])

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
