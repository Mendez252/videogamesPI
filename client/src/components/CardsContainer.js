import React, { useEffect, useState } from "react";
import "./styles/CardsContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentPage } from "../redux/actions";
import Cards from "./Cards";
import Pagination from "./Pagination";
import Spinner from "./Spinner";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const videogameSelector = useSelector(
    (state) => state.videogameSlice.allVideogames
  );

  //const platforms = useSelector((state) => state.videogameSlice.platforms);

  //console.log(videogameSelector);
  const genreSelector = useSelector((state) => state.videogameSlice.genre);
  const isLoading = useSelector((state) => state.videogameSlice.isLoading);
  const navigate = useNavigate();

  const currentPage = useSelector((state) => state.videogameSlice.currentPage);
  const [videogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogame = videogameSelector?.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  useEffect(() => {}, [videogameSelector, genreSelector]);

  const pagination = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  const onHandleClick = (id) => navigate(`/videogame/${id}`);

  if (currentVideogame.length > 0) {
    var cards = currentVideogame.map((e, id) => {
      if (!e.idApi) {
        var value = e.id;
      } else {
        value = e.idApi;
      }
      return (
        <Cards
          key={id}
          genres={e.genres}
          name={e.name}
          image={e.background_image}
          onHandleClick={() => onHandleClick(value)}
        />
      );
    });
  }

  var videogames =
    currentVideogame.length === 0 ? (
      <div className="cardsContainer_error">
        Sorry, no videogames were found!
      </div>
    ) : (
      cards
    );

  return (
    <div className="cards_Container">
      <div className="pagination">
        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={videogameSelector.length}
          pagination={pagination}
        />
      </div>

      <div className="break">{isLoading ? <Spinner /> : videogames}</div>
    </div>
  );
};

export default CardsContainer;
