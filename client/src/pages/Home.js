import React from "react";
import "./styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home_container">
        <div className="border">
          <h1 className="home_title">
            <span className="">V</span>ideog<span className="a">ⓐ</span>me{" "}
            <span className="">B</span>log
          </h1>
        </div>

        <div className="border">
          <button
            className="home_button"
            onClick={() => navigate("/videogames")}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
