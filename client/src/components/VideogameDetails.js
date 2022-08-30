import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchById, Load } from "../redux/actions";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/videogameDetails.css";
import Spinner from "./Spinner";

const VideogameDetails = () => {
  const isLoading = useSelector((state) => state.videogameSlice.isLoading);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(searchById(params.id));
    dispatch(Load(true));
  }, [params.id, dispatch]);

  const details = useSelector((state) => state.videogameSlice.videogameID);

  const {
    name,
    background_image,
    released,
    rating,
    genres,
    platforms,
    description,
  } = details;

  var videogameDetails = () => {
    return (
      <>
        <div className="name">
          <h1>{name}</h1>
          <button
            className="videogameDetails_back"
            onClick={() => navigate("/videogames")}
          >
            Back
          </button>
          <div className="videogameDetails_details">
            <div>
              <p>
                <b>RELEASED DATE:</b> {released}
              </p>
              <p>
                <b>RATING:</b> {rating}
              </p>
            </div>

            <div>
              <p>
                <b>GENRE:</b>{" "}
                {genres?.map((e) => {
                  if (!e.name) {
                    return `${e} `;
                  } else {
                    return `${e.name} `;
                  }
                })}
              </p>

              <p>
                <b>PLATFORMS:</b> {platforms?.map((e) => e + " ")}
              </p>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="info">
            <img
              className="videogameDetails_img"
              src={background_image}
              alt="videogame_image"
              height="250px"
              width="300px"
            />
            <p>
              <b>DESCRIPTION:</b> {`${description}`}
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="videogameDetails_container">
      {isLoading ? <Spinner /> : videogameDetails()}
    </div>
  );
};

export default VideogameDetails;
